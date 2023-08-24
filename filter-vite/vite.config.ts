import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    target: 'esnext', // or 'modules'
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/path/to/main.tsx',
    },
  },
  plugins: [react()],
})
