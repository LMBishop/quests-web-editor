<script setup lang="ts">
import { useSessionStore, type EditorCategory } from '@/stores/session';
import { computed, ref, toRefs } from 'vue';
import { stripColourCodes } from '@/lib/util';
import EditorSidebarQuest from '@/components/Editor/EditorSidebarQuest.vue';

const props = defineProps<{
  category: EditorCategory;
}>();

const { category } = toRefs(props);

const expanded = ref(true);

const sessionStore = useSessionStore();

const questsInCategory = computed(() => {
  return sessionStore.getQuestsInCategory(category.value.id);
});

const expandCategory = () => {
  expanded.value = !expanded.value;
};

const setSelectedCategory = () => {
  sessionStore.setEditorSelected('Category', category.value.id);
};

const selected = computed(() => {
  return sessionStore.editor.selected.type === 'Category' && sessionStore.editor.selected.id === category.value.id;
});
</script>

<template>
  <div id="category-container" :class="{selected: selected}">
    <span id="category-title" @click="setSelectedCategory">
      <font-awesome-icon @click.stop="expandCategory" class="category-icon" :icon="expanded ? ['fas', 'fa-caret-down'] : ['fas', 'fa-caret-up']"/> 
      <span id="category-name">
        <span id="category-display-name">{{ stripColourCodes(category.display.name) }}</span> 
        <code id="category-display-id">{{ category.id }}</code> 
      </span>
    </span>
  </div>
  <div v-if="expanded" id="quests">
    <EditorSidebarQuest class="quest" v-for="quest in questsInCategory" :key="quest.id" :quest="quest" />
  </div>
</template>

<style scoped>
#category-container {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
  border-bottom: 1px solid var(--color-border-soft);
  
  #category-title {
    display: flex;
    align-items: center;
    margin: 0;
    gap: 1rem;
    font-size: 1.1rem;
    
    #category-name {
      display: flex;
      flex-direction: column;
      align-items: left;
      
      #category-display-id {
        font-size: 0.8rem;
        color: var(--color-text-mute);
      }
    }
  }
}

.selected {
  background-color: var(--color-primary-mute);
}
    
#quests {
  background-color: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border-soft);
}

.quest {
  margin: 0 0 0 1.4rem;
  background-color: var(--color-background);
  border-left: 1px solid var(--color-border);
}

#category-container:hover {
  background-color: var(--color-hover);
}
</style>