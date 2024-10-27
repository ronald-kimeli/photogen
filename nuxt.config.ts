// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import { initializeApp, getApps } from 'firebase/app'; 

const firebaseConfig =  {
  apiKey: process.env.BASE_URL,
  authDomain: process.env.BASE_DOMAIN,
}

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    'nuxt-vuefire',
    '@pinia/nuxt',
  ],
  vuefire: {
    auth: true, 
    config: firebaseConfig, 
    },
  app: {
    head: {
      link: [
        { rel: 'StyleSheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" },
        { rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" },
        { rel: "stylesheet", href: "https://cdn.lineicons.com/4.0/lineicons.css" },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' },
      ]
    },
  },
  css: [
    '@/assets/css/custom.css'
  ],
  compatibilityDate: '2024-10-26',
});

