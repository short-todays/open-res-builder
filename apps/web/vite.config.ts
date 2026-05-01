import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@open-resume-builder/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
})
