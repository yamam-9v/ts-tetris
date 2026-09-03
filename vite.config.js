import { defineConfig } from 'vitest/config';

// Dev Container内(バインドマウント越し)ではinotifyが届かずHMRが効かないことがあるため、
// DEVCONTAINER環境変数(.devcontainer/devcontainer.jsonのcontainerEnvで設定)がある場合のみポーリング監視に切り替える。
const isDevContainer = process.env.DEVCONTAINER === 'true';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.tail6bcb19.ts.net'],
    watch: isDevContainer ? { usePolling: true } : undefined,
  },
  test: {
    environment: 'jsdom',
  },
});