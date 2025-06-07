import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    envDir: path.resolve(__dirname, '../../'),
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: Number.parseInt(env.VITE_PORT) | 3000,
    },
    plugins: [
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
  }
})
