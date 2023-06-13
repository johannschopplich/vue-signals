import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const currentDir = new URL('.', import.meta.url).pathname

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(currentDir, 'src')}/`,
      'vue-signals': resolve(currentDir, '../src/index.ts'),
    },
  },

  plugins: [Vue()],

  optimizeDeps: {
    exclude: [
      'vue-signals',
    ],
  },
})
