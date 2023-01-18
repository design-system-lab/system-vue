import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist',
        }),
      ],
    },
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './client/app'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  ...(mode === 'test' ? {} : { root: 'client' })
}))
