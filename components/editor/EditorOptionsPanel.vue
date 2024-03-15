<script setup lang="ts"></script>

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
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100%;
}
</style>
