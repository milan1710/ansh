// Vite dev server के लिए plugin — `/api/meta-lead` को उसी handler से जोड़ता है
// जो production Node server उपयोग करता है, ताकि local में पूरा flow test हो सके।

import { createMetaLeadService } from './metaLeadHandler.mjs';
import { readConfig } from './metaLeadCore.mjs';

export function metaLeadApiPlugin() {
  let service = null;

  return {
    name: 'ansh-meta-lead-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/meta-lead', (req, res) => {
        if (!service) service = createMetaLeadService(readConfig());
        service.handle(req, res);
      });
    },
  };
}
