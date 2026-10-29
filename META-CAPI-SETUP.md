# Meta Conversions API — Lead tracking (Ansh Ayurveda Combo)

This document describes the Meta Conversions API (CAPI) integration added to the
`ansh-combo` funnel. Perfex CRM was **not** modified in any way.

---

## 1. How the flow works now

```
/ansh-combo/  (OrderForm.jsx)
   │  1. visitor submits the form (existing validation unchanged)
   │  2. browser creates a unique event_id (UUID v4)
   │  3. browser normalises + SHA-256 hashes the phone number
   │  4. sendBeacon → POST /api/meta-lead  { action: "intent", event_id, ph, fbp, fbc }
   │  5. the ORIGINAL native form POST to Perfex CRM continues unchanged
   ▼
Perfex CRM form endpoint (crm.bhoomidhara.in/forms/wtl/...)
   │  lead is stored by Perfex, exactly as before
   │  Perfex redirects to the `websites` field value:
   ▼
/ansh-combo/thankyou.html?eid=<event_id>
   │  6. reads event_id from ?eid (or sessionStorage fallback)
   │  7. browser Pixel: fbq('track','Lead', {...}, { eventID })   ← same id
   │  8. POST /api/meta-lead { action: "confirm", event_id }
   ▼
/api/meta-lead (Node server, server/index.mjs)
   │  9. looks up the pending intent, verifies it is unused and < 30 min old
   │ 10. sends the Lead event to graph.facebook.com/v26.0/<pixel>/events
   ▼
Meta Events Manager
```

The browser never sees an access token. The token exists only in the server
process environment (`META_ACCESS_TOKEN`).

---

## 2. What already existed (inspected before changing anything)

* The combo lead form is `ansh-combo/src/components/OrderForm/OrderForm.jsx`.
  It is a **native HTML form POST** straight to Perfex:
  `https://crm.bhoomidhara.in/forms/wtl/7818ad781e72739e372c114f14f21a16`.
  Perfex returns the visitor to the URL placed in the hidden `websites` field,
  which the component sets to `/ansh-combo/thankyou.html`.
* The real Thank You Page is `ansh-combo/thankyou.html` (a plain HTML entry in
  the Vite multi-page build — not a React route).
* A browser Meta Pixel (`VITE_FB_PIXEL_ID`, currently `743157388380631`) is
  loaded in `index.html` and `thankyou.html`.
* `thankyou.html` previously fired `Lead` on **every** page view (including
  direct visits) with **no** `eventID`, and also fired `Lead` on call/WhatsApp
  clicks. Those unconditional events are the ones that would have duplicated
  or inflated conversions.
* There was **no backend** in the project (Vite static build only), so a small
  zero-dependency Node server was added. See section 8 for hosting notes.
* `MultiStepForm.jsx` is a demo form that is not rendered by `App.jsx` and does
  not submit anywhere; it was left untouched.

---

## 3. Files created / modified

| File | Status | Purpose |
| --- | --- | --- |
| `server/metaLeadCore.mjs` | **new** | Config, normalisation, SHA-256, file store, rate limits, Meta API call |
| `server/metaLeadHandler.mjs` | **new** | `POST /api/meta-lead` — `intent` and `confirm` actions |
| `server/index.mjs` | **new** | Production server: serves `dist/` + the API, zero dependencies |
| `server/loadEnv.mjs` | **new** | Minimal `.env` reader for the production server |
| `server/vitePlugin.mjs` | **new** | Mounts the same API in `npm run dev` |
| `server/selftest.mjs` | **new** | `npm run test:capi` — stubbed Meta API self-test |
| `ansh-combo/src/lib/metaLead.js` | **new** | Browser helper: event id, hashing, beacon, confirm |
| `ansh-combo/src/components/OrderForm/OrderForm.jsx` | modified | Fires the intent before the native CRM submit; appends `?eid=` to the redirect |
| `ansh-combo/thankyou.html` | modified | Sends/confirms the Lead only for a real submission, with `eventID` dedup |
| `vite.config.js` | modified | Registers the dev API plugin + loads server-side env |
| `package.json` | modified | `npm start`, `npm run test:capi`, Node engine |
| `.env.example` | modified | Documents server-side variables (placeholders only) |
| `.env` | modified | Added `META_*` keys (token left empty — fill on the server) |
| `.gitignore` | modified | Ignores `.meta-lead-data/` (idempotency storage) |

Nothing inside Perfex CRM, its database, its settings, its form key or its
redirect behaviour was touched. The form still posts to the same URL with the
same fields.

---

## 4. Environment variables

Put these in `.env` on the **server** (`.env` is git-ignored):

```dotenv
META_PIXEL_ID=743157388380631
META_ACCESS_TOKEN=YOUR_NEW_ROTATED_ACCESS_TOKEN
META_GRAPH_API_VERSION=v26.0

# only while testing in Events Manager → Test Events
META_TEST_EVENT_CODE=

# optional
META_LEAD_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
META_LEAD_STORE_DIR=
PORT=3000
HOST=0.0.0.0
```

Rules enforced by this implementation:

* `META_ACCESS_TOKEN` has **no** `VITE_`/`REACT_APP_` prefix, so Vite never
  inlines it into the browser bundle. (Verified: the built `dist/assets/*.js`
  contains no token or `META_ACCESS_TOKEN` string.)
* The token is sent to Meta in the **POST body**, not as a query parameter.
  It is never written to logs, responses or the idempotency files.
* Token rotation: generate a new system-user token in Meta Business Settings →
  System Users → *Conversions API*, paste it into `.env`, restart
  `npm start`. Nothing else changes.

`v26.0` is the current Graph API version (released 29 July 2026). The backend
validates the `vNN.N` format; if Meta retires the version, update only
`META_GRAPH_API_VERSION` (or the default in `server/metaLeadCore.mjs`).

---

## 5. Event payload actually sent

`server/metaLeadCore.mjs` → `sendLeadEvent()` builds:

```json
{
  "data": [
    {
      "event_name": "Lead",
      "event_time": 1761700000,
      "event_id": "b3f1c2d4-1111-4222-8333-444455556666",
      "action_source": "website",
      "event_source_url": "https://your-domain.com/ansh-combo/",
      "user_data": {
        "ph": ["<sha256 of 917041305592>"],
        "client_ip_address": "<request IP>",
        "client_user_agent": "<request user-agent>",
        "fbp": "fb.1....",
        "fbc": "fb.1...."
      },
      "custom_data": {
        "content_name": "Order Form",
        "content_category": "Ansh Ayurveda"
      }
    }
  ],
  "access_token": "<server-side only>",
  "test_event_code": "<only when configured>"
}
```

* `event_time` is generated server-side as the current Unix time in **seconds**.
* `event_id` is generated once per form submission and reused for the browser
  and the server event (Meta deduplication) and for idempotency.
* The phone is normalized to digits with country code (`7041305592` →
  `917041305592`) and hashed with SHA-256 **once**, lowercase hex.
* No hashing of already-hashed values: the server accepts only a 64-char hex
  hash from the browser (or a raw value in the insecure-context fallback, which
  it normalizes and hashes itself).
* `em` is only included when an email actually exists — this form does not
  collect email, so it is omitted. Empty fields are never sent.
* No health, fertility, product-interest or medical information is sent. Only
  the generic label "Order Form" is used.
* No identifiers are invented: without a real phone/hash and `_fbp`, the
  backend rejects the intent.

### Idempotency / duplicate protection

1. The browser creates **one** `event_id` per form load.
2. The `intent` call writes `identifier → pending` (atomic JSON file in
   `.meta-lead-data/`); repeating the same `event_id` does not reset it.
3. The `confirm` call is serialised per `event_id` (in-process lock) and:
   * returns `not_found` when no intent exists (direct visit, forged request),
   * returns `sent` + `duplicate: true` when it was already sent,
   * returns `expired` after 30 minutes,
   * otherwise sends the event **once** and stores the result.
4. Refreshing the Thank You Page can only ever reach `sent (duplicate)` —
   Meta is not called again.
5. Files older than 7 days are purged at startup.

### Meta API error handling

| Situation | Result stored | Client behaviour |
| --- | --- | --- |
| `200` + `events_received >= 1` | `sent` | stops |
| `429`, `5xx`, timeout, network error | `pending` (attempt incremented, max 6) | refresh / retry can resend |
| `400`, `401`, `403`, other permanent errors | `failed` (never retried automatically) | stops |
| `200` but `events_received: 0` | `failed` | stops |

The endpoint never reports `sent` unless Meta's response says the event was
received.

---

## 6. Browser Pixel deduplication

`ansh-combo/thankyou.html` now sends:

```js
fbq('track', 'Lead',
    { content_name: 'Order Form', content_category: 'Ansh Ayurveda' },
    { eventID: metaLeadEventId });
```

Same `event_name` (`Lead`) and same `event_id` as the server event, so Meta
merges the browser and server events into one conversion. The extra `Lead`
fired on call/WhatsApp clicks was removed (those clicks now send `Contact`
only), because they are not form conversions and would create extra,
non-deduplicated Lead events.

The Thank You Page fires nothing when no valid `event_id` exists (direct visit,
bookmark, crawler), and never calls the CRM.

---

## 7. Security properties and honest limitations

Implemented:

* Token only in server env; never in JS, URL, response, log or stored file.
* `POST` only; JSON only; body limited to 16 KB.
* Origin/Referer allow-list (same host automatically allowed, or
  `META_LEAD_ALLOWED_ORIGINS`).
* `event_id` must be a UUID v4; hashes must be 64-char lowercase hex.
* One `intent` per `event_id`; one Meta call per conversion (persisted).
* Rate limits: 6 intents / 10 min / IP, 20 confirms / 10 min / IP.
* Intent expires after 30 min; identifiers are wiped after a successful send.
* Raw phone numbers are never stored server-side. When the browser cannot use
  `crypto.subtle` (non-HTTPS LAN test), a normalized number is sent over HTTPS
  to our own backend and hashed there, then discarded.
* Logs contain only `event_id`, status, HTTP status and Meta's error text.

Limitations to be aware of:

1. **CRM confirmation is indirect.** The browser posts the lead natively to
   Perfex (a cross-domain form POST), so our server cannot read Perfex's
   response. "Successful submission" is inferred from the visit to the Thank You
   Page plus a prior intent created at submit time. An attacker would have to
   deliberately call `intent` and then `confirm` to fabricate one event; the
   origin check, UUID requirement, rate limits and 30-minute window make this
   impractical but not cryptographically impossible. For cryptographic proof,
   the form POST would have to be proxied through this backend — that *would*
   change the existing CRM submission path, which you asked to keep untouched.
   Say the word if you want that variant later.
2. **Single Node instance.** Idempotency uses the local filesystem
   (`.meta-lead-data/`). Do not run multiple instances/containers against a
   shared, non-persistent filesystem unless you switch the store to Redis or a
   database. A restart is safe (files persist), but two parallel instances can
   both read `pending` for the same event.
3. **Not for static-only hosting.** The bundle alone cannot send CAPI events.
   `dist/` must be served by `server/index.mjs` (or the endpoint ported to your
   host's serverless function). See deployment below.

---

## 8. Local testing and deployment

### Local

```bash
cp .env.example .env      # then fill META_ACCESS_TOKEN
npm install
npm run test:capi         # stubbed Meta API self-test — no token needed
npm run dev               # http://localhost:5173/ansh-combo/
```

`npm run dev` mounts the real API at `/api/meta-lead` (see
`server/vitePlugin.mjs`), so the full flow can be tested locally. The thank-you
page is at `http://localhost:5173/ansh-combo/thankyou.html?eid=<uuid>` — but a
made-up `eid` will correctly return `not_found` and send nothing.

### Production (`npm start`)

```bash
npm ci
npm run build
META_ACCESS_TOKEN=... npm start      # serves dist/ + /api/meta-lead on PORT
```

`server/index.mjs` is a plain Node HTTP server with no dependencies:

* serves `dist/` (`SITE_DIST` can override),
* needs `META_*` in the environment or in `.env`,
* must run behind HTTPS (reverse proxy is fine — `X-Forwarded-For` and
  `X-Forwarded-Proto` are honoured).

If your host runs a Node app (cPanel *Setup Node.js App*, VPS, Railway, Render,
Docker, etc.), point the start command at `npm start` and make sure
`.meta-lead-data/` is writable and persistent.

**If your host is PHP/MySQL-only (no Node support)**, this repo's Node
endpoint cannot run. Options, in order of effort:

1. Enable a Node app on the same hosting (most cPanel accounts support this).
2. Port `server/metaLeadHandler.mjs` to a PHP endpoint with the same contract:
   `POST /api/meta-lead` with `{action:"intent"|"confirm", event_id, ...}`,
   writing one JSON state file per `event_id` outside the web root. The browser
   code and the payload/validation rules stay identical.
3. Put the endpoint on any small Node/PHP host (e.g. `api.your-domain.com`) and
   change `ENDPOINT` in `ansh-combo/src/lib/metaLead.js` and
   `META_LEAD_ENDPOINT` in `ansh-combo/thankyou.html`; add that origin to
   `META_LEAD_ALLOWED_ORIGINS` and enable credentials/CORS on the API host.

Tell me which hosting you actually use and I will adapt the endpoint to it.

### Reverse proxy (nginx) example

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Note: the pixel itself is served from `connect.facebook.net` and is not blocked
by this setup; if an ad blocker blocks the browser `Lead`, the server event is
still sent (deduplication then simply has nothing to merge).

---

## 9. Meta Events Manager — testing with Test Events

1. Open **Events Manager → Data Sources → your Pixel (743157388380631) →
   Test Events**. Copy the `TEST####` code shown there.
2. Put it in `.env` **on the server**:
   `META_TEST_EVENT_CODE=TEST12345` and restart `npm start`.
3. Optional but recommended: in Test Events, use **Test Event Code → Add test
   user** with the phone you will submit from, so the event is matched.
4. On the live site, submit the form once with a real (test) phone number.
5. Back in Test Events you should see:
   * **Browser** — `Lead` with `event_id`
   * **Server** — `Lead` with the *same* `event_id`, and Events Manager labels
     it **Deduplicated**.
6. Check the server log for the matching line:
   `[meta-capi] {"event_id":"...","step":"confirm","status":"sent","http":200,"events_received":1}`
7. **Remove `META_TEST_EVENT_CODE` from production `.env`** after testing and
   restart. Events sent with a test code never enter production reporting.

### What the different statuses mean (they are not the same)

| Status | Meaning |
| --- | --- |
| Lead saved in Perfex CRM | Perfex accepted the form POST. Completely independent of Meta. Only Perfex / its DB can confirm this. |
| `[meta-capi] step=intent` | The website recorded a submission attempt; no Meta call yet. |
| HTTP 200 `events_received: 1` | **Meta accepted the request** for processing (our `sent`). |
| Event visible in Events Manager | Meta processed the event. There can be a delay (minutes) and events can still be discarded for quality reasons. |
| Lead attributed to a campaign | Meta matched the event to a person/ad interaction (advanced matching + attribution window). This can take 24–72 h and may never happen for some events. |

Never treat `events_received: 1` as "ad converted". It only means the pipeline
accepted the payload.

---

## 10. Testing checklist

1. **Valid submission** — submit the form with name, 10-digit mobile, address.
   * Expect: form navigates to Perfex, then back to
     `/ansh-combo/thankyou.html?eid=<uuid>`.
2. **Lead in Perfex** — confirm the lead exists in the CRM with the product and
   price fields. (This is the CRM status, separate from Meta.)
3. **Thank You Page** — the existing design/content still renders and the
   `eid` query parameter is present (a UUID; no email/phone).
4. **Backend received the request** — server log shows
   `step=intent` for that UUID, then `step=confirm`.
5. **Meta valid response** — the confirm response / log shows
   `"status":"sent","http":200,"events_received":1`.
6. **Events Manager** — `Lead` appears under Test Events (or in the dataset's
   event list within a few minutes).
7. **Refresh thank-you** — reload 3–5 times: response is
   `status:"sent", duplicate:true`; no new Meta request (log has no new
   `confirm` with Meta HTTP). Event count in Events Manager does not increase.
8. **Direct visit** — open `/ansh-combo/thankyou.html` in a fresh tab or a
   private window with no `eid`: no `Lead`, no `/api/meta-lead` call (Network
   tab), page still works.
9. **Failed CRM submission** — force a CRM validation error (e.g. block the CRM
   request in DevTools, or submit invalid data if the CRM rejects it). No
   thank-you page ⇒ no confirm ⇒ no Meta event. The orphan intent expires in
   30 min and sends nothing.
10. **Meta API failure** — temporarily set an invalid `META_ACCESS_TOKEN` (or
    turn off the network) and submit once: the lead is still saved in Perfex
    (CRM is untouched), the thank-you page still works, status `failed`
    (permanent) or `pending` (transient). Restore the token — no duplicate CRM
    lead is ever created because the thank-you flow never posts to the CRM.
11. **Token hidden** — DevTools → Sources/Network: `META_ACCESS_TOKEN` and the
    token value appear nowhere in JS, HTML, URLs or API responses.
    `dist/assets/*.js` was checked for this.
12. **Deduplication** — in Events Manager open the event and confirm the
    Browser and Server rows share one `event_id` and are shown as deduplicated
    (one Lead, not two).
13. **Rate limit / abuse** — `curl` the endpoint 7 times quickly from one IP:
    the 7th returns `429 rate_limited`. Posting `confirm` for a random UUID
    returns `not_found` and sends nothing.
14. **Mobile + iOS** — run one test from a phone; iOS Safari may block
    third-party cookies (browser pixel), the server event must still arrive.

`npm run test:capi` automates the equivalent backend cases (intent idempotency,
single Meta call, dedup, invalid input, transient retry, expiry, no token
leakage) without touching the live Meta API.

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `503 server_not_configured` | `META_PIXEL_ID` / `META_ACCESS_TOKEN` missing or `META_GRAPH_API_VERSION` malformed | Fill `.env` on the server, restart. Validate `vNN.N`. |
| `400 invalid_event_id` | Broken/old thank-you link | Use the link produced by the form; don't hand-craft `eid` values. |
| `status: not_found` | Beacon never reached the server (blocked, offline), intent expired, or a direct visit | Check the Network tab for the `/api/meta-lead` POST at submit time; check `403 origin_not_allowed` or `429 rate_limited` in the log. |
| `403 origin_not_allowed` | Site served on a different origin than the API (www vs non-www, http vs https, or API on another domain) | Add the exact origin to `META_LEAD_ALLOWED_ORIGINS`; ensure `Host`/`X-Forwarded-Proto` are forwarded by the proxy. |
| `429 rate_limited` | More than 6 intents or 20 confirms in 10 min from one IP (office/NAT, repeated testing) | Wait 10 min; raise the limits in `server/metaLeadHandler.mjs` if legitimate. |
| `status: failed`, Meta `Invalid OAuth access token` | Wrong/expired/rotated token | Generate a new system-user token with `ads_management` + `business_management` (or the Conversions API permission set your Business Manager requires), update `.env`, restart. |
| `status: failed`, Meta error about `event_time` | Server clock is wrong or event older than 7 days | Sync server time (NTP); intents expire after 30 min so a stale event should not occur. |
| `status: failed`, `events_received: 0` | Payload rejected (e.g. all user_data invalid) | Check the log error text; ensure the phone submitted is a valid 10-digit Indian mobile. |
| `status: pending` repeatedly | Network/timeouts to graph.facebook.com, or 5xx from Meta | The next confirm (refresh) retries; max 6 attempts. Check outbound HTTPS from the host. |
| Duplicate Leads in Events Manager | Older replicated pages still firing the old unconditional `Lead` | Rebuild and redeploy `dist/`; ensure `thankyou.html` contains `eventID`. Browser Pixel helper/extension may also fire — test in a clean profile. |
| No browser `Lead`, only server | Pixel blocked (ad blocker, iOS ITP) or `VITE_FB_PIXEL_ID` missing at build time | Expected in some cases; server event still counts. Rebuild after setting the pixel ID. |
| Browser `Lead` but no server | `/api/meta-lead` 404 — `dist/` served by a static host | Serve the site with `npm start` (or port the endpoint). |
| Thank-you page redirects to CRM domain | The `websites` hidden field is not absolute | Already handled via `absoluteRedirectUrl()`; verify the page is served from the final public origin. |
| Events Manager shows events but no campaign attribution | Normal — attribution depends on matching and ad interaction | Wait 24–72 h; improve match quality (phone + `_fbp` present, correct `event_source_url`). |

Useful checks:

```bash
# is the API configured? (503 = no token)
curl -i -X POST https://your-domain.com/api/meta-lead \
  -H 'Content-Type: application/json' -H 'Origin: https://your-domain.com' \
  -d '{"action":"confirm","event_id":"aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee"}'

# verify v26.0 is accepted by Meta (expect an OAuth error with a bad token,
# which proves URL + version are valid)
curl -i -X POST 'https://graph.facebook.com/v26.0/743157388380631/events' \
  -H 'Content-Type: application/json' \
  -d '{"data":[],"access_token":"INVALID"}'
```

Test-event codes must never remain in production: they route events into the
Test Events view instead of normal reporting.

---

## 12. Confirmation: Perfex CRM was not modified

* No Perfex file, database table, setting, API key, form field or workflow was
  changed. This repository does not contain Perfex at all.
* The lead form still uses the same `action`
  (`https://crm.bhoomidhara.in/forms/wtl/7818ad781e72739e372c114f14f21a16`),
  the same `csrf_token_name`/`key` hidden fields, the same `multipart/form-data`
  POST and the same Perfex-managed fields. Only the hidden `websites` value now
  carries a `?eid=<uuid>` suffix so the thank-you page knows which conversion
  to confirm.
* No CRM request is made from the Thank You Page, and no retry can create a
  second lead: the only CRM write path is still the visitor's own form POST.
* Form validation, layout, copy and routes are unchanged.

---

## 13. Optional follow-ups (not done, by design)

* `ansh-gujarati/thankyou.html` still fires an unconditional browser `Lead`
  (same Pixel ID). It was left untouched because it belongs to the Gujarati
  funnel; if you want the same CAPI treatment there, the same three pieces can
  be reused (client helper + endpoint + `eventID`).
* `MultiStepForm.jsx` is a demo not rendered by `App.jsx`; it still calls
  `trackEvent('Lead')` locally. It cannot affect real traffic today.
* A background retry worker (cron hitting `confirm` for `pending` intents) can
  be added if you want retries independent of page refreshes. With 6 attempts
  and 30-minute TTL, the current design already retries on refresh.
