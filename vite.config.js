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
        target: 'https://telegrams.su',  // Адрес вашего API сервера
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
