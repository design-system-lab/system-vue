import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables";',
      }
    }
  },
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ...(mode === 'test' ? {} : { root: 'client' })
}))
