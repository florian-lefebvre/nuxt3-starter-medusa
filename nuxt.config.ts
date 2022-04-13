import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: ["@/assets/css/globals.css"],
  build: {
    transpile: ["@heroicons/vue"],
  },
});
