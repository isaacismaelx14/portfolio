// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.isaacmartinez.dev',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['html2canvas-pro', 'jspdf']
    }
  },

  integrations: [
    sitemap({
      // The /[lang]/lead landing is unlisted: keep it out of the sitemap.
      filter: (page) => !/^\/[a-z]{2}\/lead\/?$/.test(new URL(page).pathname),
    }),
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true
    }
  }
});