<script setup lang="ts">
definePageMeta({
  layout: 'editor'
})
</script>

<template>
  <div id="title">
    <b>Select a quest or category to continue</b>
  </div>
</template>

<style lang="scss" scoped>
#title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;

  b {
    font-weight: bolder;
    font-size: 1.5rem;
  }
}
</style>