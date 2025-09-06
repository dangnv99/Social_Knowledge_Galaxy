import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Social_Knowledge_Galaxy/',  // 👈 BẮT BUỘC: đúng tên repo
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
