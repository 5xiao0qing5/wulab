import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wulab/', // 这里必须和你刚才创建的仓库名一致
})