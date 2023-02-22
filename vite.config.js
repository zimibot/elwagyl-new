import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: 'localhost',
    port: '8000'
  },

  build: {
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all',
        name: true
      },
      runtimeChunk: true
    },
    // minify: false,
    // sourcemap: false,
    outDir: path.resolve(__dirname, 'build'),
    chunkSizeWarningLimit: 1600,
  },
  plugins: [react()],

})
