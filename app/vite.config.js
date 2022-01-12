import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0', // Important to setup to expose in Docker
  },
  plugins: [vue()],
  build: {
    outDir: "./dist/",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
