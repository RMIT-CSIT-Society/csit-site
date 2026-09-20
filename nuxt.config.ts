// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
  },

  components: [
    //global: true,
    "~/components",
    { path: "~/components/layout/grid", extensions: ["vue"] },
    { path: "~/components/layout/structure", extensions: ["vue"] },
  ],

  modules: ["@vueuse/nuxt", "@nuxt/image", "@tresjs/nuxt", "@pinia/nuxt"],

  vite: {
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "three",
        "@tresjs/cientos",
        "dayjs",
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        },
      },
    },
  },

  runtimeConfig: {
    apiEndpoint: "http://localhost:3001/api",
    public: {
      apiEndpoint: "http://localhost:3001/api",
    },
  },

  experimental: {
    viewTransition: true,
  },
});
