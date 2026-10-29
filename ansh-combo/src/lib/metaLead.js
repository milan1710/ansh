// Meta Conversions API — browser-side helper.
//
// यहाँ कोई token नहीं है। browser सिर्फ़:
//   1. एक unique event_id बनाता है,
//   2. फ़ोन नंबर को normalize कर SHA-256 hash करता है,
//   3. intent backend को भेजता है (form submit के समय),
//   4. thank-you पेज से confirm भेजता है।
//
// access token पूरी तरह server-side environment variable में रहता है।

const STORAGE_KEY = 'ansh_meta_lead_event';
const ENDPOINT = '/api/meta-lead';

export const LEAD_EVENT_NAME = 'Lead';

export function createEventId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // पुराने ब्राउज़र के लिए RFC 4122 v4 fallback
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(
    16,
    20
  )}-${hex.slice(20)}`;
}

export function isValidEventId(value) {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

// Meta नियम: hash से पहले country code के साथ सिर्फ़ अंक।
export function normalizePhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10 && /^[6-9]/.test(digits)) digits = `91${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) digits = `91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith('0091')) digits = digits.slice(2);
  if (digits.length < 10 || digits.length > 15) return '';
  return digits;
}

export function normalizeEmail(raw) {
  const value = String(raw || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : '';
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// SHA-256 — HTTPS (या localhost) पर उपलब्ध। न हो तो '' लौटाता है और
// normalize किया हुआ मान server को भेजा जाता है (server वहीं hash करता है)।
export async function sha256Hex(value) {
  if (
    typeof crypto === 'undefined' ||
    !crypto.subtle ||
    typeof crypto.subtle.digest !== 'function'
  ) {
    return '';
  }
  try {
    const data = new TextEncoder().encode(String(value));
    return toHex(await crypto.subtle.digest('SHA-256', data));
  } catch {
    return '';
  }
}

function readCookie(name) {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

// event_id को session में याद रखें — thank-you पेज refresh होने पर भी
// वही id मिलेगी, इसलिए दोबारा event नहीं बनेगा।
export function rememberLeadEvent(eventId) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ eventId, createdAt: Date.now() }));
  } catch {
    // sessionStorage उपलब्ध न हो तो URL का eid ही इस्तेमाल होगा।
  }
}

export function readRememberedLeadEvent() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidEventId(parsed.eventId) ? parsed : null;
  } catch {
    return null;
  }
}

// फ़ॉर्म सबमिट के समय — non-blocking beacon, ताकि CRM की navigation रुके नहीं।
export async function sendLeadIntent({ eventId, phone, email, eventSourceUrl }) {
  if (!isValidEventId(eventId)) return false;

  const normalizedPhone = normalizePhone(phone);
  const normalizedEmail = normalizeEmail(email);

  const [phHash, emHash] = await Promise.all([
    normalizedPhone ? sha256Hex(normalizedPhone) : Promise.resolve(''),
    normalizedEmail ? sha256Hex(normalizedEmail) : Promise.resolve(''),
  ]);

  const payload = {
    action: 'intent',
    event_id: eventId,
    event_source_url: eventSourceUrl,
    ph: phHash || undefined,
    em: emHash || undefined,
    // crypto.subtle न हो तो server hash करेगा (raw कभी store नहीं होता)।
    phone_raw: !phHash && normalizedPhone ? normalizedPhone : undefined,
    email_raw: !emHash && normalizedEmail ? normalizedEmail : undefined,
    fbp: readCookie('_fbp'),
    fbc: readCookie('_fbc'),
  };

  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    if (navigator.sendBeacon(ENDPOINT, blob)) return true;
  }

  try {
    // बहुत पुराने ब्राउज़र (sendBeacon नहीं) के लिए — फ़ॉर्म सबमिशन को ज़्यादा
    // देर न रोकें, इसलिए छोटा timeout।
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1500);
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'same-origin',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
    return true;
  } catch {
    return false;
  }
}

// Thank-you पेज से confirm। `not_found` पर थोड़ा रुक कर दोबारा कोशिश —
// क्योंकि submit के समय भेजा गया beacon server तक थोड़ा देर से पहुँच सकता है।
export async function confirmLeadEvent(eventId, { attempts = 4 } = {}) {
  if (!isValidEventId(eventId)) return { ok: false, status: 'invalid_event_id' };

  const delays = [0, 700, 1500, 3000];
  let last = { ok: false, status: 'not_attempted' };

  for (let i = 0; i < attempts; i += 1) {
    if (delays[i]) await new Promise((resolve) => setTimeout(resolve, delays[i]));

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'confirm', event_id: eventId }),
        credentials: 'same-origin',
        cache: 'no-store',
      });
      const data = await response.json().catch(() => null);
      if (!data) return { ok: false, status: 'bad_response' };
      last = data;

      if (data.status === 'sent') return data;
      // not_found ही एकमात्र ऐसी स्थिति है जिसमें दोबारा कोशिश का फ़ायदा है।
      if (data.status !== 'not_found') return data;
    } catch {
      last = { ok: false, status: 'network_error' };
    }
  }

  return last;
}

export function clearRememberedLeadEvent() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // कुछ न करें
  }
}
