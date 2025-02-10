import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'TorHopper',
        description: 'Torrent Search Aggregator',
        theme_color: '#2E86C1',
        icons: [
          {
            src: 'icon_x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'masked-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})