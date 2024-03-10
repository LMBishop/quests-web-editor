<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { loadQuestsFromJson, loadCategoriesFromJson } from '@/lib/questsLoader';
import EditorSidebar from '@/components/Editor/EditorSidebar.vue';
import testData from '@/data/testData.json';
import taskDefinitions from '@/data/taskDefinitions.json';
import EditorPane from '@/components/Editor/EditorPane.vue';

const sessionStore = useSessionStore();

const quests = loadQuestsFromJson(testData.quests);
const categories = loadCategoriesFromJson(testData.categories);

sessionStore.setQuests(quests);
sessionStore.setCategories(categories);
sessionStore.setTaskDefinitions(taskDefinitions.taskTypes);
// sessionStore.updateEditorCategories();
</script>

<template>
  <main>
    <div id="editor-container">
      <EditorSidebar />
      
      <EditorPane />
    </div>
  </main>
</template>

<style lang="scss" scoped>
#editor-container {
  display: flex;
  background-color: var(--color-background-soft);
  max-height: calc(100vh - 73px);
  flex-direction: row;
}
</style>