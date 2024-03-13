<script setup land="ts">
const config = useAppConfig();
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <footer id="footer">
    <p id="copyright-license">
      Released under the GPL-3.0 License.
    </p>
    <p id="git-commit-hash">
      <font-awesome-icon :icon="['fas', 'code-branch']" />
      <NuxtLink to="https://github.com/LMBishop/quests-web-editor/">quests-web-editor</NuxtLink>
      <span>@</span>
      <NuxtLink :to="`https://github.com/LMBishop/quests-web-editor/commit/${runtimeConfig.public.gitCommitHash}`">
        {{ runtimeConfig.public.gitCommitHashShort }}
      </NuxtLink>
      <span>
        ({{ runtimeConfig.public.gitBranch }})
      </span>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
#footer {
  height: 30px;
  max-height: 30px;
  border-top: 1px solid var(--color-border-soft);
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 0.8rem;
  align-items: center;
  padding: 0 0.5rem;
}

#copyright-license {
  color: var(--color-text-mute);
}

#git-commit-hash {
  display: flex;
  color: var(--color-text-mute);
  align-items: center;
  gap: 0.3rem;

  a {
    text-decoration: none;
  }
}
</style>