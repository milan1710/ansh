import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  // मुख्य पेज (index.html) के साथ-साथ थैंक यू पेज (thankyou.html) भी बिल्ड हो,
  // इसलिए दोनों को entry के रूप में जोड़ा गया है।
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        thankyou: fileURLToPath(new URL('thankyou.html', import.meta.url)),
      },
    },
  },
});
