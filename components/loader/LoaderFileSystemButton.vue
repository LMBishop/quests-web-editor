<script setup lang="ts">
import type LoaderFileSystemModal from './LoaderFileSystemModal.vue';

const loaderStore = useLoaderStore();

const { canUseFsApi } = getBrowserCapabilities();

const fileSystemModal = ref<InstanceType<typeof LoaderFileSystemModal> | null>(null);

const openFileSystemPrompt = async () => {
  fileSystemModal.value?.open();
  loaderStore.setFileSystemLoaderStatus('pending');
  const dirHandle = await openFileSystem();
  if (!dirHandle) {
    loaderStore.setFileSystemLoaderStatus('inactive');
    return;
  }
  loaderStore.setPath(dirHandle.name);
  loaderStore.setFileSystemLoaderStatus('loaded');
  try {
    const { categories, quests, items } = await enumerateQuestDirectory(dirHandle);
    loaderStore.setCategories(categories);
    loaderStore.setQuests(quests);
    loaderStore.setItems(items);
    loaderStore.setFileSystemLoaderStatus('valid');
  } catch (e) {
    console.error(e);
    loaderStore.setFileSystemLoaderStatus('invalid');
  }
}
</script>

<template>
  <ClientOnly>
    <Button type="solid" :icon="['fas', 'folder-open']" label="Load" @click="openFileSystemPrompt"
      :disabled="!canUseFsApi" />

    <LoaderFileSystemModal ref="fileSystemModal" />
  </ClientOnly>
</template>