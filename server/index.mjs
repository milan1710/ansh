// Production server — बिना किसी extra dependency के।
//
//   npm run build
//   npm start            (PORT=3000 डिफ़ॉल्ट)
//
// यह `dist/` की static फ़ाइलें serve करता है और `/api/meta-lead` पर Meta
// Conversions API endpoint देता है। Access token सिर्फ़ इसी process के
// environment में रहता है — कभी bundle में नहीं जाता।

import http from 'node:http';
import { createReadStream } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFiles } from './loadEnv.mjs';
import { readConfig } from './metaLeadCore.mjs';
import { createMetaLeadService } from './metaLeadHandler.mjs';

loadEnvFiles();

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = path.resolve(process.env.SITE_DIST || path.join(projectRoot, 'dist'));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

const config = readConfig();
const service = createMetaLeadService(config);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function sendText(res, statusCode, text) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(text);
}

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = decoded.replace(/^\/+/, '');
  const target = path.resolve(siteRoot, relative);

  if (target !== siteRoot && !target.startsWith(siteRoot + path.sep)) return null;

  try {
    const stats = await fs.stat(target);
    if (stats.isDirectory()) {
      const indexFile = path.join(target, 'index.html');
      const indexStats = await fs.stat(indexFile);
      return indexStats.isFile() ? indexFile : null;
    }
    return stats.isFile() ? target : null;
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = req.url || '/';

    if (urlPath === '/api/meta-lead' || urlPath.startsWith('/api/meta-lead?')) {
      await service.handle(req, res);
      return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      sendText(res, 405, 'Method Not Allowed');
      return;
    }

    const filePath = await resolveFile(urlPath);
    if (!filePath) {
      const notFound = await resolveFile('/404.html');
      if (notFound) {
        res.statusCode = 404;
        res.setHeader('Content-Type', MIME_TYPES['.html']);
        createReadStream(notFound).pipe(res);
        return;
      }
      sendText(res, 404, 'Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    res.setHeader(
      'Cache-Control',
      ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'HEAD') {
      res.statusCode = 200;
      res.end();
      return;
    }

    createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error('[static]', error && error.message);
    if (!res.headersSent) sendText(res, 500, 'Internal Server Error');
  }
});

server.listen(port, host, () => {
  console.info(`Ansh Ayurveda server listening on http://${host}:${port}`);
  console.info(`Serving static files from ${siteRoot}`);
  console.info(
    config.isConfigured
      ? `Meta CAPI ready: pixel ${config.pixelId} (${config.apiVersion})`
      : 'Meta CAPI NOT configured — set META_PIXEL_ID and META_ACCESS_TOKEN in .env'
  );
  if (config.testEventCode) {
    console.info(`Meta test_event_code active: ${config.testEventCode}`);
  }
});
