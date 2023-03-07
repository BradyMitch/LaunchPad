/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@node_modules': path.resolve(__dirname, 'node_modules'),
    },
  },
  server: {
    host: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://backend:9009/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setupTests.ts', 'public/', 'build/'],
    },
  },
});
