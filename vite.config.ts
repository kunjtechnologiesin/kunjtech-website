import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inline-css',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(html, ctx) {
          if (!ctx.bundle) return html;
          let newHtml = html;
          for (const [fileName, asset] of Object.entries(ctx.bundle)) {
            if (fileName.endsWith('.css') && 'source' in asset) {
              const css = asset.source.toString();
              const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const linkRegex = new RegExp(`<link rel="stylesheet"[^>]+href="[^"]*${escaped}"[^>]*>`, 'g');
              newHtml = newHtml.replace(linkRegex, '');
              newHtml = newHtml.replace('</head>', `<style>${css}</style></head>`);
            }
          }
          return newHtml;
        },
      },
    },
  ],
  build: {
    target: 'es2023',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            return 'vendor'
          }
        },
      },
    },
  },
})