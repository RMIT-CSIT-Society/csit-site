// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  components: [
    //global: true,
    "~/components",
    { path: "~/components/layout/grid", extensions: ["vue"] },
    { path: "~/components/layout/structure", extensions: ["vue"] },
  ],

  modules: ["@vueuse/nuxt", "@nuxt/image", "@tresjs/nuxt"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  experimental: {
    viewTransition: true,
  },
});
