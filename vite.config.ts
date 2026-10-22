import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    target: 'es2015',
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: Infinity, // Встраиваем все ассеты
    rolldownOptions: {
      input: {
        main: resolve('src/index.html'),
      },
      output: {
        codeSplitting: false,
        entryFileNames: 'index.js',
        chunkFileNames: 'index.js',
        assetFileNames: 'index.css'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
