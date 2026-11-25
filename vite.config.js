import { defineConfig } from 'vite'

export default defineConfig({
  // Relative asset paths so GitHub Pages /subdir hosting works.
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
