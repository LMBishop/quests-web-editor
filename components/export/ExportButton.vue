<script setup lang="ts">
import type ExportModal from './ExportModal.vue';

const exportModal = ref<InstanceType<typeof ExportModal> | null>(null);

const openExportModal = async () => {
  exportModal.value?.open();
};
</script>

<template>
  <Button
    type="solid"
    :icon="['fas', 'file-export']"
    label="Save / Export"
    @click="openExportModal"
  />

  <ExportModal ref="exportModal" />
</template>
