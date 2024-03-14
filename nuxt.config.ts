export default defineNuxtConfig({
  components: [
    { path: '~/components', pathPrefix: true },
    { path: '~/components/base', pathPrefix: false },
    { path: '~/components/header', pathPrefix: false },
    { path: '~/components/footer', pathPrefix: false },
  ],
  devtools: { enabled: true },
  modules: [
    // ...
    '@pinia/nuxt',
    'nuxt-prepare'
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
    ],
  },
  runtimeConfig: {
    public: {
      gitCommitHash: process.env.GIT_COMMIT_HASH,
      gitCommitHashShort: process.env.GIT_COMMIT_HASH_SHORT,
      gitBranch: process.env.GIT_BRANCH
    }
  }
})
