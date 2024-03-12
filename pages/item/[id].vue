<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { stripColorCodes } from '@/lib/util';

definePageMeta({
  layout: 'editor'
})

const sessionStore = useSessionStore();
const route = useRoute();

const itemId = route.params.id as string;

const item = sessionStore.getItemById(itemId);
</script>

<template>
  <PageHeader>
    <span id="path">
      <font-awesome-icon class="icon" :icon="['fas', 'cube']" />
      <span class="title">{{ itemId }} </span>
    </span>
    <span id="controls" class="control-group">
      <Button type="solid" :disabled="true" :icon="['fas', 'fa-save']" :label="'Save'"></Button>
    </span>
  </PageHeader>

  <div id="options-container">
  </div>
</template>

<style scoped>
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