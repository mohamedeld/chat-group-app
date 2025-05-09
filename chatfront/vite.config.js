import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws:true,
        secure: false, // Add this if your server is not using HTTPS
        rewrite: (path) => path.replace(/^\/socket.io/, '/socket.io') // Ensure path is correctly rewritten
      }
    }
  }
})
