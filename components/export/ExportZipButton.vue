<script setup lang="ts">
import type ExportZipModal from './ExportZipModal.vue';

const exportZipModal = ref<InstanceType<typeof ExportZipModal> | null>(null);

const startZipExport = async () => {
  exportZipModal.value?.open();
  exportZipModal.value?.startExport();
}
</script>

<template>
  <ClientOnly>
    <Button type="solid" label="Continue" @click="startZipExport" />

    <ExportZipModal ref="exportZipModal" />
  </ClientOnly>
</template>