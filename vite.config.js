import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // 🔁 important for dev server (optional but good)
  },
  build: {
    outDir: 'dist', // default, but safe to be explicit
  },
})
