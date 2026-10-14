import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icon.svg", "apple-touch-icon-180x180.png"],
      manifest: {
        name: "Azumah · Dashboard",
        short_name: "Azumah",
        description: "Manage your portfolio and private notes.",
        start_url: "/admin",
        scope: "/",
        display: "standalone",
        background_color: "#0e1a2b",
        theme_color: "#0e1a2b",
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          { name: "New note", url: "/admin/notes" },
          { name: "New project", url: "/admin/projects/new" },
          { name: "View portfolio", url: "/" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        globIgnores: ["images/**", "resume.pdf"],
        navigateFallback: "/index.html",
        // Firebase Auth's redirect handler must never be served from cache.
        navigateFallbackDenylist: [/^\/__\//],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/images/"),
            handler: "CacheFirst",
            options: { cacheName: "site-images", expiration: { maxEntries: 80 } },
          },
          {
            urlPattern: ({ url }) =>
              url.hostname === "firebasestorage.googleapis.com" &&
              url.searchParams.get("alt") === "media",
            handler: "CacheFirst",
            options: {
              cacheName: "uploads",
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "fonts", cacheableResponse: { statuses: [0, 200] } },
          },
        ],
      },
    }),
  ],
});
