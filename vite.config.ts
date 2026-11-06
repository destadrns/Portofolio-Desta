import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The largest chunk is the WebGL hero (three.js, about 535 kB, 135 kB gzip). It loads on demand
    // after the page is idle and only on wide mouse screens, so the 500 kB default warning does not
    // apply to it; the initial bundle stays far below this limit.
    chunkSizeWarningLimit: 600,
  },
});
