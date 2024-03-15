<script setup lang="ts">
defineProps({
  isPrimaryAction: Boolean,
});

const navigateToImport = async () => {
  navigateTo('/import');
};
</script>

<template>
  <Button
    :type="isPrimaryAction ? 'solid' : 'text'"
    :icon="['fas', 'file-import']"
    label="Import"
    @click="navigateToImport"
  />
</template>
