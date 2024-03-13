<script setup lang="ts">
import { useSessionStore } from '@/stores/session';

definePageMeta({
  layout: 'editor'
})

const sessionStore = useSessionStore();
const route = useRoute();

const categoryId = route.params.id as string;

const categoryName = sessionStore.getCategoryById(categoryId)?.display.name;
</script>

<template>
  <PageHeader>
    <span id="path">
      <font-awesome-icon class="icon" :icon="['fas', 'fa-folder']" />
      <span class="title" v-if="categoryName">{{ stripColorCodes(categoryName) }} </span>
      <code>({{ categoryId }})</code>
    </span>
    <span id="controls" class="control-group">
      <Button type="solid" :disabled="true" :icon="['fas', 'fa-save']" :label="'Save'"></Button>
    </span>
  </PageHeader>

  <div id="options-container">
    <EditorCategoryOptionsPanel :categoryId="categoryId" />
    <EditorCategoryChildrenOptionsPanel :categoryId="categoryId" />
  </div>
</template>

<style scoped>
#options-container {
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  max-height: calc(100% - 55px);
}

header {
  border-bottom: 1px solid var(--color-border);
}
</style>