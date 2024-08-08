import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.JPG"],
  base: "/",
  server: {
    proxy: {
      '/api2': {
        target: 'http://localhost:5000',  // Адрес вашего API сервера
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
