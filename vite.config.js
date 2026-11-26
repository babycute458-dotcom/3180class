import { defineConfig } from 'vite'

export default defineConfig({
  // Relative asset paths so GitHub Pages / subdirectory hosting works.
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['@huggingface/transformers', '@capacitor-community/speech-recognition'],
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 3000,
  },
  worker: {
    format: 'es',
  },
})
