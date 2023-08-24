import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    target: 'esnext', // or 'modules'
    manifest: true,
   
  },
  plugins: [react()],
})
