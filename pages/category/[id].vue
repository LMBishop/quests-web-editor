<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { stripColorCodes } from '@/lib/util';

definePageMeta({
  layout: 'editor'
})

const sessionStore = useSessionStore();
const route = useRoute();

const categoryId = route.params.id as string;

const categoryName = sessionStore.getCategoryById(categoryId)?.display.name;
</script>

<template>
  <div id="header">
    <span id="path">
      <font-awesome-icon class="icon" :icon="['fas', 'fa-folder']" />
      <span class="title" v-if="categoryName">{{ stripColorCodes(categoryName) }} </span>
      <code>({{ categoryId }})</code>
    </span>
    <span id="controls" class="control-group">
      <Button type="solid" :disabled="true" :icon="['fas', 'fa-save']" :label="'Save'"></Button>
    </span>
  </div>

  <div id="options-container">
    <EditorCategoryOptionsPanel :categoryId="categoryId" />
    <EditorCategoryChildrenOptionsPanel :categoryId="categoryId" />
  </div>
</template>

<style scoped>
#header {
  padding: 1rem 1rem 0.5rem 1rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 55px;
  display: flex;
  align-items: left;
  justify-content: space-between;
  gap: 1rem;

  #path {
    font-size: 1.2rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .icon {
      font-size: 0.8rem;
    }

    .chevron {
      font-size: 0.8rem;
      color: var(--color-text-mute);
    }

    .title {
      font-weight: 700;
    }

    code {
      font-size: 0.8rem;
      color: var(--color-text-mute);
    }
  }
}

.none-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.2rem;
  color: var(--color-text-mute);
}

#pane-container {
  width: 100%;
  flex-grow: 1;
  height: calc(100vh - 73px);
  max-height: calc(100vh - 73px);
}

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