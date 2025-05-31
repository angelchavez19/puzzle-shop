import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/icon", "@nuxt/image"],
  vite: { plugins: [tailwindcss()] },
  dir: { pages: "routes" },
  css: ["@/assets/css/main.css"],
});
