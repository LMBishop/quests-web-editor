<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import taskDefinitions from '@/data/taskDefinitions.json';

const sessionStore = useSessionStore();

sessionStore.setTaskDefinitions(taskDefinitions.taskTypes);
sessionStore.setTaskTypeAliases(taskDefinitions.aliases);
// sessionStore.updateEditorCategories();
</script>

<template>
  <SiteHeader />

  <div id="editor-container">
    <EditorSidebar />

    <div id="editor-pane">
      <slot />
    </div>
  </div>

  <SiteFooter />
</template>

<style lang="scss" scoped>
#editor-container {
  display: flex;
  background-color: var(--color-background-soft);
  height: calc(100vh - 104px);
  max-height: calc(100vh - 104px);
  flex-direction: row;
}

#editor-pane {
  width: 100%;
}
</style>
