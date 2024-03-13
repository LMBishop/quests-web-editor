import { execSync } from "child_process";

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
  hooks: {
    "build:before": () => {
      const gitCommitHash = execSync('git rev-parse HEAD').toString().trim();
      const gitCommitHashShort = gitCommitHash.slice(0, 8);
      const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

      process.env.GIT_COMMIT_HASH = gitCommitHash;
      process.env.GIT_COMMIT_HASH_SHORT = gitCommitHashShort;
      process.env.GIT_BRANCH = gitBranch;
    }
  },
  runtimeConfig: {
    public: {
      gitCommitHash: process.env.GIT_COMMIT_HASH,
      gitCommitHashShort: process.env.GIT_COMMIT_HASH_SHORT,
      gitBranch: process.env.GIT_BRANCH
    }
  }
})
