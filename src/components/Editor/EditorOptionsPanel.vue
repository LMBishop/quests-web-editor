<script setup lang="ts">
</script>

<template>
  <div id="options-panel">
    <slot />
  </div>
</template>

<style scoped>
#options-panel {
  width: 100%;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 1rem;
  height: 100%;
}
</style>