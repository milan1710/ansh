// Meta Conversions API — साझा (shared) सर्वर-साइड लॉजिक।
//
// यह फ़ाइल Vite dev server (npm run dev) और production Node server
// (npm start) — दोनों में एक जैसी चलती है। इसमें कोई भी secret लॉग या
// HTTP response में वापस नहीं भेजा जाता।
//
// ज़रूरी environment variables (सिर्फ़ server साइड, VITE_ prefix कभी नहीं):
//   META_PIXEL_ID             — 743157388380631
//   META_ACCESS_TOKEN         — Meta Events Manager का system-user token
//   META_GRAPH_API_VERSION    — v26.0 (default भी v26.0)
//   META_TEST_EVENT_CODE      — वैकल्पिक, Test Events के लिए
//   META_LEAD_ALLOWED_ORIGINS — वैकल्पिक, comma separated
//   META_LEAD_STORE_DIR       — वैकल्पिक, idempotency फ़ाइलों की जगह

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export const INTENT_TTL_MS = 30 * 60 * 1000; // 30 मिनट
export const MAX_SEND_ATTEMPTS = 6;
export const META_TIMEOUT_MS = 10 * 1000;

const GRAPH_HOST = 'https://graph.facebook.com';

// ---------------------------------------------------------------- config ----

export function readConfig(env = process.env) {
  const pixelId = String(env.META_PIXEL_ID || '').trim();
  const accessToken = String(env.META_ACCESS_TOKEN || '').trim();
  const apiVersion = String(env.META_GRAPH_API_VERSION || 'v26.0').trim();
  const testEventCode = String(env.META_TEST_EVENT_CODE || '').trim();
  const allowedOrigins = String(env.META_LEAD_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const storeDir = String(env.META_LEAD_STORE_DIR || '').trim();
  const versionOk = /^v\d{1,2}\.\d$/.test(apiVersion);

  return {
    pixelId,
    accessToken,
    apiVersion,
    testEventCode,
    allowedOrigins,
    storeDir: storeDir
      ? path.resolve(storeDir)
      : path.resolve(process.cwd(), '.meta-lead-data'),
    isConfigured: Boolean(pixelId && accessToken && versionOk),
    graphUrl: versionOk && pixelId ? `${GRAPH_HOST}/${apiVersion}/${pixelId}/events` : '',
  };
}

// --------------------------------------------------------- normalization ----

// Meta को hash से पहले साफ़ (normalized) मान चाहिए — email lowercase,
// phone सिर्फ़ अंकों में, देश कोड के साथ, बिना + या space के।
export function normalizeEmail(raw) {
  const value = String(raw || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : '';
}

export function normalizePhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '';
  // भारतीय फ़ॉर्म में 10 अंकों का मोबाइल भरा जाता है — देश कोड जोड़ें।
  if (digits.length === 10 && /^[6-9]/.test(digits)) digits = `91${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) digits = `91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith('0091')) digits = digits.slice(2);
  if (digits.length < 10 || digits.length > 15) return '';
  return digits;
}

export function sha256Hex(value) {
  return createHash('sha256').update(String(value), 'utf8').digest('hex');
}

export function isSha256Hex(value) {
  return typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
}

// client द्वारा भेजा गया event_id सिर्फ़ UUID v4 हो सकता है।
export function isEventId(value) {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

export function isHttpUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

// fbp / fbc Meta के अपने cookie मान हैं — PII नहीं, लेकिन लंबाई सीमित रखें।
export function sanitizeCookieValue(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!/^[A-Za-z0-9._~-]{4,200}$/.test(trimmed)) return '';
  return trimmed;
}

// --------------------------------------------------------------- storage ----

// हर conversion के लिए एक छोटी JSON फ़ाइल — इससे idempotency server restart
// के बाद भी बनी रहती है। इस project को single Node instance पर चलाएँ।
export class IntentStore {
  constructor(dir) {
    this.dir = dir;
    this.locks = new Map();
  }

  async init() {
    await fs.mkdir(this.dir, { recursive: true });
    await this.purgeOld(7 * 24 * 60 * 60 * 1000);
  }

  // पुरानी idempotency फ़ाइलें हटाएँ — disk भरता न रहे।
  async purgeOld(maxAgeMs) {
    const cutoff = Date.now() - maxAgeMs;
    let entries = [];
    try {
      entries = await fs.readdir(this.dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.endsWith('.json')) continue;
      const filePath = path.join(this.dir, entry);
      try {
        const stats = await fs.stat(filePath);
        if (stats.mtimeMs < cutoff) await fs.unlink(filePath);
      } catch {
        // किसी एक फ़ाइल की समस्या से startup न रुके।
      }
    }
  }

  fileFor(eventId) {
    return path.join(this.dir, `${eventId}.json`);
  }

  async read(eventId) {
    try {
      const raw = await fs.readFile(this.fileFor(eventId), 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw error;
    }
  }

  async write(record) {
    const target = this.fileFor(record.event_id);
    const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(record), 'utf8');
    await fs.rename(tmp, target);
  }

  async remove(eventId) {
    try {
      await fs.unlink(this.fileFor(eventId));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }

  // एक ही event_id पर parallel requests को क्रम से चलाएँ।
  async withLock(eventId, task) {
    const previous = this.locks.get(eventId) || Promise.resolve();
    const run = previous.then(task, task);
    const guard = run.catch(() => {});
    this.locks.set(eventId, guard);
    try {
      return await run;
    } finally {
      if (this.locks.get(eventId) === guard) this.locks.delete(eventId);
    }
  }
}

// ----------------------------------------------------------- rate limits ----

export class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.hits = new Map();
  }

  allow(key) {
    const now = Date.now();
    const list = (this.hits.get(key) || []).filter((time) => now - time < this.windowMs);
    if (list.length >= this.limit) {
      this.hits.set(key, list);
      return false;
    }
    list.push(now);
    this.hits.set(key, list);
    if (this.hits.size > 5000) {
      for (const [entry, times] of this.hits) {
        if (!times.some((time) => now - time < this.windowMs)) this.hits.delete(entry);
      }
    }
    return true;
  }
}

// ------------------------------------------------------------- Meta call ----

function classifyFailure(httpStatus, errorBody) {
  const error = errorBody && errorBody.error ? errorBody.error : {};
  return {
    // network, timeout, rate limit और 5xx — दोबारा कोशिश की जा सकती है।
    retryable: httpStatus === 0 || httpStatus === 429 || httpStatus >= 500,
    message: String(error.message || error.error_user_msg || '').slice(0, 300),
    code: error.code || null,
  };
}

export async function sendLeadEvent(config, record) {
  if (!config.isConfigured) {
    return {
      ok: false,
      sent: false,
      retryable: false,
      httpStatus: 0,
      errorMessage: 'server_not_configured',
    };
  }

  const userData = {};
  if (record.em) userData.em = [record.em];
  if (record.ph) userData.ph = [record.ph];
  if (record.client_ip) userData.client_ip_address = record.client_ip;
  if (record.client_user_agent) userData.client_user_agent = record.client_user_agent;
  if (record.fbp) userData.fbp = record.fbp;
  if (record.fbc) userData.fbc = record.fbc;

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor((record.created_at || Date.now()) / 1000),
        event_id: record.event_id,
        action_source: 'website',
        event_source_url: record.event_source_url,
        user_data: userData,
        custom_data: {
          content_name: 'Order Form',
          content_category: 'Ansh Ayurveda',
        },
      },
    ],
  };

  // Test Events के लिए — production में यह variable खाली रखें।
  if (config.testEventCode) payload.test_event_code = config.testEventCode;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), META_TIMEOUT_MS);

  try {
    const response = await fetch(config.graphUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // token URL में नहीं, POST body में — proxy/logs में leak न हो।
      body: JSON.stringify({ ...payload, access_token: config.accessToken }),
      signal: controller.signal,
    });

    const text = await response.text();
    let parsed = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    if (response.ok && parsed && Number(parsed.events_received) >= 1) {
      return {
        ok: true,
        sent: true,
        retryable: false,
        httpStatus: response.status,
        eventsReceived: Number(parsed.events_received),
        fbtraceId: parsed.fbtrace_id || '',
      };
    }

    const failure = classifyFailure(response.status, parsed);
    return {
      ok: false,
      sent: false,
      retryable: failure.retryable,
      httpStatus: response.status,
      errorMessage:
        failure.message ||
        `meta_http_${response.status}_events_received_${parsed ? parsed.events_received ?? 0 : 0}`,
      errorCode: failure.code,
      fbtraceId: parsed && parsed.fbtrace_id ? parsed.fbtrace_id : '',
    };
  } catch (error) {
    return {
      ok: false,
      sent: false,
      retryable: true,
      httpStatus: 0,
      errorMessage:
        error && error.name === 'AbortError' ? 'meta_request_timeout' : 'meta_network_error',
    };
  } finally {
    clearTimeout(timer);
  }
}
