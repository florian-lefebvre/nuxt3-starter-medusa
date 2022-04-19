import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],
  build: {
    transpile: ["@heroicons/vue", "@headlessui/vue"],
  },
  tailwindcss: {
    viewer: false,
  },
});
