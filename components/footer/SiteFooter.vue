<script setup land="ts">
const config = useAppConfig();
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <footer id="footer">
    <p id="copyright-license">

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
  max-height: 40px;
  padding: 0.5rem;
  border-top: 1px solid var(--color-border-soft);
  display: flex;
  width: 100%;
  justify-content: space-between;
}

#git-commit-hash {
  display: flex;
  color: var(--color-text-mute);
  align-items: center;
  gap: 0.3rem;
  align-self: flex-end;

  a {
    text-decoration: none;
  }
}
</style>