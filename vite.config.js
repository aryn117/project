// filepath: /C:/Users/Aryan/Desktop/project/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon_96.png','icon_144.png','icon_192.png', 'icon_512.png' , 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Tor-Hopper',
        short_name: 'Tor-Hopper',
        description: 'A Torrent Aggregator App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})