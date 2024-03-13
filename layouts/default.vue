<script setup lang="ts">
</script>

<template>
  <SiteHeader />

  <div id="content">
    <slot />
  </div>
</template>

<style scoped>
#content {
  display: flex;
  height: calc(100vh - 73px);
  flex-direction: row;
}

#content {
  width: 100%;
}
</style>