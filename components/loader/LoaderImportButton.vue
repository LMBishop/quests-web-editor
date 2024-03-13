<script setup lang="ts">
const navigateToImport = async () => {
  navigateTo('/import');
}
</script>

<template>
  <Button type="solid" :icon="['fas', 'file-import']" label="Import" @click="navigateToImport" />
</template>