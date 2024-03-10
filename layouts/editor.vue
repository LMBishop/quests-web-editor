<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { loadQuestsFromJson, loadCategoriesFromJson } from '@/lib/questsLoader';
import SiteHeader from '@/components/Header/SiteHeader.vue';
import EditorSidebar from '@/components/Editor/EditorSidebar.vue';
import testData from '@/data/testData.json';
import taskDefinitions from '@/data/taskDefinitions.json';

const sessionStore = useSessionStore();

const quests = loadQuestsFromJson(testData.quests);
const categories = loadCategoriesFromJson(testData.categories);

sessionStore.setQuests(quests);
sessionStore.setCategories(categories);
sessionStore.setTaskDefinitions(taskDefinitions.taskTypes);
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
</template>

<style lang="scss" scoped>
#editor-container {
  display: flex;
  background-color: var(--color-background-soft);
  max-height: calc(100vh - 73px);
  flex-direction: row;
}

#editor-pane {
  width: 100%;
}
</style>