// `/api/meta-lead` का HTTP handler — Vite dev server और production server
// दोनों इसी कोड को कॉल करते हैं।
//
// दो actions:
//   intent  — फ़ॉर्म सबमिट होते समय: event_id + hashed identifiers सुरक्षित रखें
//   confirm — thank-you पेज से: intent मिलने पर Meta CAPI को Lead भेजें (एक ही बार)

import {
  INTENT_TTL_MS,
  MAX_SEND_ATTEMPTS,
  IntentStore,
  RateLimiter,
  isEventId,
  isHttpUrl,
  isSha256Hex,
  normalizeEmail,
  normalizePhone,
  readConfig,
  sanitizeCookieValue,
  sendLeadEvent,
  sha256Hex,
} from './metaLeadCore.mjs';

const MAX_BODY_BYTES = 16 * 1024;

function json(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const candidate = (raw ? String(raw).split(',')[0] : req.socket?.remoteAddress) || '';
  return candidate.replace(/^::ffff:/, '').trim().slice(0, 45);
}

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return '';
  for (const part of String(header).split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    if (part.slice(0, index).trim() === name) {
      try {
        return decodeURIComponent(part.slice(index + 1).trim());
      } catch {
        return '';
      }
    }
  }
  return '';
}

function originAllowed(config, req) {
  const origin = req.headers.origin ? String(req.headers.origin) : '';
  const host = req.headers.host ? String(req.headers.host) : '';
  const proto = String(req.headers['x-forwarded-proto'] || 'http').split(',')[0].trim();

  const allowed = new Set(config.allowedOrigins);
  if (host) {
    allowed.add(`https://${host}`);
    allowed.add(`http://${host}`);
    const bareHost = host.replace(/^www\./, '');
    allowed.add(`https://${bareHost}`);
    allowed.add(`http://${bareHost}`);
    allowed.add(`https://www.${bareHost}`);
  }

  // कुछ ब्राउज़र/बीकन में Origin नहीं आता — तब Referer देखें।
  if (!origin) {
    const referer = req.headers.referer ? String(req.headers.referer) : '';
    if (!referer) return true; // curl / health-check; आगे की validation बाकी है
    try {
      return allowed.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  if (host && origin === `${proto}://${host}`) return true;
  return allowed.has(origin);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('payload_too_large'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(Object.assign(new Error('invalid_json'), { statusCode: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function logEvent(entry) {
  // सिर्फ़ गैर-संवेदनशील tracking जानकारी — कोई token, email, फ़ोन नहीं।
  console.info('[meta-capi]', JSON.stringify(entry));
}

export function createMetaLeadService(config = readConfig()) {
  const store = new IntentStore(config.storeDir);
  const intentLimiter = new RateLimiter(6, 10 * 60 * 1000);
  const confirmLimiter = new RateLimiter(20, 10 * 60 * 1000);
  let ready = null;

  const ensureStore = () => {
    if (!ready) {
      ready = store.init().catch((error) => {
        ready = null;
        throw error;
      });
    }
    return ready;
  };

  async function handleIntent(body, req) {
    const eventId = body.event_id;
    if (!isEventId(eventId)) {
      return { httpStatus: 400, payload: { ok: false, status: 'invalid_event_id' } };
    }
    if (!isHttpUrl(body.event_source_url)) {
      return { httpStatus: 400, payload: { ok: false, status: 'invalid_source_url' } };
    }

    // client पहले से hash भेजता है; crypto.subtle उपलब्ध न हो तो raw भेजा जा
    // सकता है — सर्वर उसे hash करता है और raw कभी सहेजता नहीं।
    let ph = isSha256Hex(body.ph) ? body.ph : '';
    let em = isSha256Hex(body.em) ? body.em : '';
    if (!ph && typeof body.phone_raw === 'string') {
      const normalized = normalizePhone(body.phone_raw);
      if (normalized) ph = sha256Hex(normalized);
    }
    if (!em && typeof body.email_raw === 'string') {
      const normalized = normalizeEmail(body.email_raw);
      if (normalized) em = sha256Hex(normalized);
    }

    const fbp = sanitizeCookieValue(body.fbp || readCookie(req, '_fbp'));
    const fbc = sanitizeCookieValue(body.fbc || readCookie(req, '_fbc'));
    if (!ph && !em && !fbp) {
      return { httpStatus: 400, payload: { ok: false, status: 'missing_user_data' } };
    }

    const record = await store.withLock(eventId, async () => {
      const existing = await store.read(eventId);
      if (existing) return existing; // वही event_id दोबारा — कुछ न बदलें

      const created = {
        event_id: eventId,
        created_at: Date.now(),
        status: 'pending',
        attempts: 0,
        event_source_url: body.event_source_url,
        ph,
        em,
        fbp,
        fbc,
        client_ip: clientIp(req),
        client_user_agent: String(req.headers['user-agent'] || '').slice(0, 500),
        last_attempt_at: 0,
      };
      await store.write(created);
      return created;
    });

    logEvent({ event_id: eventId, step: 'intent', status: record.status });
    return { httpStatus: 200, payload: { ok: true, status: 'pending', event_id: eventId } };
  }

  async function handleConfirm(eventId) {
    if (!isEventId(eventId)) {
      return { httpStatus: 400, payload: { ok: false, status: 'invalid_event_id' } };
    }

    const result = await store.withLock(eventId, async () => {
      const record = await store.read(eventId);

      // intent नहीं मिला — thank-you पेज कुछ बार retry करेगा, पर event नहीं बनेगा।
      if (!record) return { status: 'not_found' };

      // पहले ही भेजा जा चुका — दोबारा Meta पर नहीं जाएगा।
      if (record.status === 'sent') {
        return { status: 'sent', duplicate: true, fbtrace_id: record.fbtrace_id || '' };
      }

      // स्थायी रूप से reject हो चुका event दोबारा नहीं भेजा जाता।
      if (record.status === 'failed') {
        return { status: 'failed', error: record.last_error || '' };
      }

      if (Date.now() - record.created_at > INTENT_TTL_MS) {
        return { status: 'expired' };
      }

      if (record.attempts >= MAX_SEND_ATTEMPTS) {
        return { status: 'failed', error: 'max_attempts_reached' };
      }

      const response = await sendLeadEvent(config, record);
      record.attempts += 1;
      record.last_attempt_at = Date.now();

      if (response.sent) {
        record.status = 'sent';
        record.sent_at = Date.now();
        record.meta_http_status = response.httpStatus;
        record.fbtrace_id = response.fbtraceId || '';
        // Meta तक पहुँचने के बाद matching identifiers की ज़रूरत नहीं —
        // data retention कम रखने के लिए हटा दें।
        record.ph = '';
        record.em = '';
        record.fbp = '';
        record.fbc = '';
        record.client_ip = '';
        record.client_user_agent = '';
      } else if (response.retryable) {
        record.status = 'pending';
        record.last_error = response.errorMessage;
        record.meta_http_status = response.httpStatus;
      } else {
        record.status = 'failed';
        record.last_error = response.errorMessage;
        record.meta_http_status = response.httpStatus;
      }

      await store.write(record);

      logEvent({
        event_id: eventId,
        step: 'confirm',
        status: record.status,
        http: response.httpStatus,
        events_received: response.eventsReceived || 0,
        error: response.errorMessage || '',
      });

      return {
        status: record.status,
        retryable: Boolean(response.retryable),
        http_status: response.httpStatus,
        events_received: response.eventsReceived || 0,
        fbtrace_id: response.fbtraceId || '',
      };
    });

    return {
      httpStatus: 200,
      payload: {
        ok: result.status === 'sent',
        event_id: eventId,
        status: result.status,
        duplicate: Boolean(result.duplicate),
        retryable: Boolean(result.retryable),
        meta_http_status: result.http_status || 0,
        events_received: result.events_received || 0,
        fbtrace_id: result.fbtrace_id || '',
      },
    };
  }

  async function handle(req, res) {
    try {
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        json(res, 405, { ok: false, status: 'method_not_allowed' });
        return;
      }
      if (!originAllowed(config, req)) {
        json(res, 403, { ok: false, status: 'origin_not_allowed' });
        return;
      }
      if (!config.isConfigured) {
        // token/Pixel ID सेट नहीं — साइट सामान्य चलेगी, बस event नहीं जाएगा।
        logEvent({ status: 'server_not_configured' });
        json(res, 503, { ok: false, status: 'server_not_configured' });
        return;
      }

      await ensureStore();

      let body;
      try {
        body = await readJsonBody(req);
      } catch (error) {
        json(res, error.statusCode || 400, { ok: false, status: error.message });
        return;
      }

      const ip = clientIp(req) || 'unknown';
      const action = String(body.action || 'confirm');

      if (action === 'intent') {
        if (!intentLimiter.allow(ip)) {
          json(res, 429, { ok: false, status: 'rate_limited' });
          return;
        }
        const result = await handleIntent(body, req);
        json(res, result.httpStatus, result.payload);
        return;
      }

      if (action === 'confirm') {
        if (!confirmLimiter.allow(ip)) {
          json(res, 429, { ok: false, status: 'rate_limited' });
          return;
        }
        const result = await handleConfirm(body.event_id);
        json(res, result.httpStatus, result.payload);
        return;
      }

      json(res, 400, { ok: false, status: 'unknown_action' });
    } catch (error) {
      logEvent({ status: 'server_error', message: String(error && error.message).slice(0, 200) });
      json(res, 500, { ok: false, status: 'server_error' });
    }
  }

  return { handle };
}
