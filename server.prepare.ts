import { execSync } from 'child_process';
import { defineNuxtPrepareHandler } from 'nuxt-prepare/config';

export default defineNuxtPrepareHandler(async () => {
  const gitCommitHash = execSync('git rev-parse HEAD').toString().trim();
  const gitCommitHashShort = gitCommitHash.slice(0, 8);
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  return {
    runtimeConfig: {
      public: {
        gitCommitHash: gitCommitHash,
        gitCommitHashShort: gitCommitHashShort,
        gitBranch: gitBranch,
      },
    },

    state: {
      foo: 'bar',
    },
  };
});
