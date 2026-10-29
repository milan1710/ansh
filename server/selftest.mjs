// `/api/meta-lead` का self-test (कोई real token या network नहीं चाहिए)।
//
//   npm run test:capi
//
// Meta की API को stub किया जाता है, इसलिए यह production token को छूता नहीं।

import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { createHash } from 'node:crypto';
import { createMetaLeadService } from './metaLeadHandler.mjs';

const storeDir = await fs.mkdtemp(path.join(os.tmpdir(), 'meta-lead-test-'));

const config = {
  pixelId: '743157388380631',
  accessToken: 'TEST_TOKEN_SHOULD_NEVER_LEAK',
  apiVersion: 'v26.0',
  testEventCode: 'TEST12345',
  allowedOrigins: [],
  storeDir,
  isConfigured: true,
  graphUrl: 'https://graph.facebook.com/v26.0/743157388380631/events',
};

let failures = 0;
function check(name, condition, extra = '') {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name} ${extra}`);
  }
}

function post(port, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const request = http.request(
      {
        host: '127.0.0.1',
        port,
        path: '/api/meta-lead',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          Origin: `http://127.0.0.1:${port}`,
          'User-Agent': 'meta-lead-selftest',
        },
      },
      (response) => {
        let text = '';
        response.on('data', (chunk) => {
          text += chunk;
        });
        response.on('end', () => {
          resolve({ status: response.statusCode, body: JSON.parse(text) });
        });
      }
    );
    request.on('error', reject);
    request.end(data);
  });
}

const metaCalls = [];
let metaMode = 'success';
const realFetch = globalThis.fetch;

globalThis.fetch = async (url, options) => {
  metaCalls.push({ url: String(url), options });
  if (metaMode === 'network_error') throw new Error('simulated network down');
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify({ events_received: 1, fbtrace_id: 'TEST_TRACE_ID' }),
  };
};

const service = createMetaLeadService(config);
const server = http.createServer((req, res) => service.handle(req, res));
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;

const phoneHash = createHash('sha256').update('917041305592').digest('hex');
const eventId = 'b3f1c2d4-1111-4222-8333-444455556666';
const sourceUrl = 'https://example.com/ansh-combo/';

console.log('Meta CAPI endpoint self-test');

// 1) intent
let response = await post(port, {
  action: 'intent',
  event_id: eventId,
  event_source_url: sourceUrl,
  ph: phoneHash,
  fbp: 'fb.1.1700000000000.1234567890',
});
check('intent accepted', response.status === 200 && response.body.status === 'pending');
check('intent response has no token', !JSON.stringify(response.body).includes('TEST_TOKEN'));

// 2) same intent again (beacon retry) — should stay pending, no reset
response = await post(port, {
  action: 'intent',
  event_id: eventId,
  event_source_url: sourceUrl,
  ph: phoneHash,
});
check('duplicate intent is idempotent', response.status === 200 && response.body.status === 'pending');

// 3) confirm → sent
response = await post(port, { action: 'confirm', event_id: eventId });
check('confirm sends to Meta', response.body.status === 'sent' && response.body.events_received === 1);
check('exactly one Meta request', metaCalls.length === 1, `(got ${metaCalls.length})`);

const metaCall = metaCalls[0];
const sentBody = JSON.parse(metaCall.options.body);
const sentEvent = sentBody.data[0];
check('endpoint uses v26.0 + pixel id', metaCall.url === config.graphUrl);
check(
  'token is in POST body, not URL',
  !metaCall.url.includes('TEST_TOKEN') && sentBody.access_token === config.accessToken
);
check('event_name is Lead', sentEvent.event_name === 'Lead');
check('event_id preserved', sentEvent.event_id === eventId);
check('action_source is website', sentEvent.action_source === 'website');
check('event_source_url is form page', sentEvent.event_source_url === sourceUrl);
check(
  'phone is sent as SHA-256',
  Array.isArray(sentEvent.user_data.ph) && sentEvent.user_data.ph[0] === phoneHash
);
check('no raw phone in payload', !JSON.stringify(sentEvent).includes('917041305592'));
check('test_event_code forwarded', sentBody.test_event_code === 'TEST12345');
check('no email field when unavailable', sentEvent.user_data.em === undefined);
check('client ip forwarded', typeof sentEvent.user_data.client_ip_address === 'string');

// 4) refresh thank-you → duplicate, no second Meta call
response = await post(port, { action: 'confirm', event_id: eventId });
check('refresh returns sent + duplicate', response.body.status === 'sent' && response.body.duplicate === true);
check('still only one Meta request', metaCalls.length === 1, `(got ${metaCalls.length})`);

// 5) identifiers cleared after success
const stored = JSON.parse(await fs.readFile(path.join(storeDir, `${eventId}.json`), 'utf8'));
check('hashes cleared after send', stored.ph === '' && stored.client_ip === '');

// 6) direct visit / unknown id → not_found, no event
response = await post(port, { action: 'confirm', event_id: 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee' });
check('unknown event is not sent', response.body.status === 'not_found' && metaCalls.length === 1);

// 7) fabricated input validation
response = await post(port, {
  action: 'intent',
  event_id: 'not-a-uuid',
  event_source_url: sourceUrl,
  ph: phoneHash,
});
check('invalid event_id rejected', response.status === 400 && response.body.status === 'invalid_event_id');

response = await post(port, {
  action: 'intent',
  event_id: 'c3f1c2d4-1111-4222-8333-444455556666',
  event_source_url: sourceUrl,
});
check('missing user data rejected', response.status === 400 && response.body.status === 'missing_user_data');

// 8) transient Meta failure → pending, safe retry later
metaMode = 'network_error';
const retryId = 'd3f1c2d4-1111-4222-8333-444455556667';
await post(port, { action: 'intent', event_id: retryId, event_source_url: sourceUrl, ph: phoneHash });
response = await post(port, { action: 'confirm', event_id: retryId });
check(
  'timeout/network failure stays pending',
  response.body.status === 'pending' && response.body.retryable === true
);

metaMode = 'success';
response = await post(port, { action: 'confirm', event_id: retryId });
check('retry after transient failure succeeds', response.body.status === 'sent');

// 9) expired intent
const expiredId = 'e3f1c2d4-1111-4222-8333-444455556668';
await post(port, { action: 'intent', event_id: expiredId, event_source_url: sourceUrl, ph: phoneHash });
const expiredFile = path.join(storeDir, `${expiredId}.json`);
const expiredRecord = JSON.parse(await fs.readFile(expiredFile, 'utf8'));
expiredRecord.created_at = Date.now() - 31 * 60 * 1000;
await fs.writeFile(expiredFile, JSON.stringify(expiredRecord));
response = await post(port, { action: 'confirm', event_id: expiredId });
check('expired intent is not sent', response.body.status === 'expired');

// 10) token never stored
check('no token in stored files', !JSON.stringify(stored).includes('TEST_TOKEN'));

server.close();
await fs.rm(storeDir, { recursive: true, force: true });
globalThis.fetch = realFetch;

if (failures > 0) {
  console.log(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nAll checks passed');
