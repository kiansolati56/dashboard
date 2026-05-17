import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['./app/assets/css/main.css'],

  modules: ['@nuxt/image', '@pinia/nuxt', '@hypernym/nuxt-gsap'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  gsap: {
    provide: false,
    extraPlugins: {
      scrollTrigger: true
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Adnis Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'KARGAH' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍂</text></svg>'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000',
    },
  }
})