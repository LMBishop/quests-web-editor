<script setup lang="ts"></script>

<template>
  <SiteHeader />

  <div id="content">
    <slot />
  </div>

  <SiteFooter />
</template>

<style scoped>
#content {
  display: flex;
  height: calc(100vh - 104px);
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  flex-direction: row;
}

#content {
  width: 100%;
}
</style>
