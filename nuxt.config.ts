// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    { path: '~/components', pathPrefix: true },
    { path: '~/components/base', pathPrefix: false },
    { path: '~/components/header', pathPrefix: false },
  ],
  devtools: { enabled: true },
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
})