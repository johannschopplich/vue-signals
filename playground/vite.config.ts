import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      'vue-signals': resolve(__dirname, '../src/index.ts'),
    },
  },

  plugins: [Vue()],

  optimizeDeps: {
    exclude: [
      'vue-signals',
    ],
  },
})
