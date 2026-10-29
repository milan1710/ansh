// Production server के लिए बहुत छोटा .env loader (कोई extra dependency नहीं)।
// पहले से सेट environment variables को कभी override नहीं करता — hosting panel
// में भरे secrets प्राथमिकता रखते हैं।

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

function parseEnvFile(filePath) {
  const values = {};
  const raw = readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    if (!key) continue;
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

export function loadEnvFiles(cwd = process.cwd()) {
  for (const name of ['.env', '.env.local']) {
    const filePath = path.join(cwd, name);
    if (!existsSync(filePath)) continue;
    const values = parseEnvFile(filePath);
    for (const [key, value] of Object.entries(values)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}
