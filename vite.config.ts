import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(() => ({
  // Most hosts (Vercel, Netlify, a plain static server) serve this from the
  // domain root. GitHub Pages is the one exception — it serves a project
  // site under /royaracing/ — so only that workflow sets GITHUB_PAGES=true
  // to opt into the subpath build.
  base: process.env.GITHUB_PAGES === 'true' ? '/royaracing/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
}))
