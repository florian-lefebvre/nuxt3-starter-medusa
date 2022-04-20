import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css", "@/assets/css/fonts.css"],
  build: {
    transpile: ["@heroicons/vue", "@headlessui/vue"],
  },
  runtimeConfig: {
    public: {
      BACKEND_URL:
        process.env.NUXT_PUBLIC_MEDUSA_URL || "http://localhost:9000",
    },
  },
  tailwindcss: {
    viewer: false,
  },
});
