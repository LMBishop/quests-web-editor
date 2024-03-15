<script setup lang="ts">
import { saveAs } from 'file-saver';

const session = useSessionStore();
const exportStore = useExportStore();

const showModal = ref(false);

const status = computed(() => exportStore.getZipStatus());

const startExport = async () => {
  const quests = session.getQuests();
  const categories = session.getCategories();
  const items = session.getItems();

  exportStore.setZipStatus('preparing');

  const { transformedQuests, transformedCategories, transformedItems } = await prepareZip(
    quests,
    categories,
    items
  );

  exportStore.setZipStatus('compressing');

  try {
    const blob = await createZip(transformedQuests, transformedCategories, transformedItems);

    exportStore.setZipContents(blob);
    exportStore.setZipStatus('ready');

    saveAs(blob, 'quests.zip');
  } catch {
    exportStore.setZipStatus('failed');
  }
};

const open = () => {
  showModal.value = true;
};

defineExpose({
  open,
  startExport,
});
</script>

<template>
  <Modal v-model="showModal">
    <template v-slot:header>
      <h2>Export as ZIP</h2>
    </template>

    <p v-if="status === 'preparing'">Preparing quests for export...</p>
    <p v-if="status === 'compressing'">Compressing zip...</p>
    <p v-if="status === 'ready'">Done.</p>
    <p v-if="status === 'failed'">Failed to create zip.</p>

    <div id="controls" class="control-group">
      <Button :icon="['fas', 'xmark']" :label="'Close'" @click="showModal = false"></Button>
    </div>
  </Modal>
</template>

<style scoped>
#controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
