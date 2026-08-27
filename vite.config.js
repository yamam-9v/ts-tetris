import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.tail6bcb19.ts.net'],
  },
  test: {
    environment: 'jsdom',
  },
});