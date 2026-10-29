import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { metaLeadApiPlugin } from './server/vitePlugin.mjs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Dev में .env की server-side values (META_PIXEL_ID, META_ACCESS_TOKEN ...)
  // process.env में उपलब्ध कराएँ — ये browser bundle में कभी नहीं जातीं।
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of Object.keys(env)) {
    if (process.env[key] === undefined) process.env[key] = env[key];
  }

  return {
  plugins: [react(), metaLeadApiPlugin()],

  // मल्टी-पेज ऐप (MPA) — इससे हर HTML फ़ाइल अपने पूरे पथ पर खुलती है,
  // जैसे `/` (मुख्य साइट) और `/ansh-male/` (पुरुषों के लिए वेबसाइट)।
  appType: 'mpa',

  server: {
    port: 5173,
    open: true,
  },
  // तीनों पेज (मुख्य, थैंक यू और पुरुषों के लिए /ansh-male) बिल्ड हों।
  build: {
    rollupOptions: {
      input: {
        // मुख्य डोमेन — तीनों वेबसाइट में से एक चुनने का पेज
        home: fileURLToPath(new URL('index.html', import.meta.url)),
        // कॉम्बो वेबसाइट (/ansh-combo)
        anshCombo: fileURLToPath(new URL('ansh-combo/index.html', import.meta.url)),
        anshComboThankyou: fileURLToPath(
          new URL('ansh-combo/thankyou.html', import.meta.url)
        ),
        // पुरुषों की वेबसाइट (/ansh-male)
        anshMale: fileURLToPath(new URL('ansh-male/index.html', import.meta.url)),
        // गुजराती वेबसाइट (/ansh-gujarati)
        anshGujarati: fileURLToPath(new URL('ansh-gujarati/index.html', import.meta.url)),
        anshGujaratiThankyou: fileURLToPath(
          new URL('ansh-gujarati/thankyou.html', import.meta.url)
        ),
      },
    },
  },
  };
});

