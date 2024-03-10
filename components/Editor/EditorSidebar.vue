<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { storeToRefs } from 'pinia';
import EditorSidebarCategory from '@/components/Editor/EditorSidebarCategory.vue';
import EditorSidebarQuest from '@/components/Editor/EditorSidebarQuest.vue';

const sessionStore = useSessionStore();

const { session } = storeToRefs(sessionStore);
</script>

<template>
  <div id="sidebar-container">
    <EditorSidebarCategory v-for="category in session.categories" :key="category.id" :category="category" />
    <EditorSidebarQuest v-for="quest in session.quests.filter((q) => (!session.categories.some((c) => c.id === q.options.category)))" :key="quest.id" :quest="quest" />
  </div>
</template>

<style scoped>
#sidebar-container {
  width: 20rem;
  border-right: 1px solid var(--color-border);
  height: calc(100vh - 73px);
  max-height: calc(100vh - 73px);
  background-color: var(--color-background);
  user-select: none;
}
</style>