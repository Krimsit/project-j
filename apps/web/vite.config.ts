import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: Number.parseInt(env.VITE_PORT) | 3000,
    },
    plugins: [react()],
  }
})
