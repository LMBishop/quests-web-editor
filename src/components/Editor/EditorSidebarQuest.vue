<script setup lang="ts">
import { useSessionStore, type EditorQuest } from '@/stores/session';
import { computed, toRefs } from 'vue';
import { stripColourCodes } from '@/lib/util';

const props = defineProps<{
  quest: EditorQuest;
}>();

const { quest } = toRefs(props);

const sessionStore = useSessionStore();

const setSelectedQuest = () => {
  sessionStore.setEditorSelected('Quest', quest.value.id);
};

const selected = computed(() => {
  return sessionStore.editor.selected.type === 'Quest' && sessionStore.editor.selected.id === quest.value.id;
});
</script>

<template>
  <div id="quest-container" @click.stop="setSelectedQuest" :class="{selected: selected}">
    <span id="quest-title">
      <font-awesome-icon class="quest-icon" :icon="['far', 'fa-compass']"/> 
      <span id="quest-name">
        <span id="quest-display-name">{{ stripColourCodes(quest.display.name) }}</span> 
        <code id="quest-display-id">{{ quest.id }}</code> 
      </span>
    </span>
  </div>
</template>

<style scoped>
#quest-container {
  cursor: pointer;
  padding: 0.3rem 1rem;
  transition: background-color 0.3s;

  #quest-title {
    display: flex;
    align-items: center;
    margin: 0;
    gap: 0.5rem;
    font-size: 0.8rem;
    
    #quest-name {
      display: flex;
      flex-direction: column;
      align-items: left;
      
      #quest-display-id {
        font-size: 0.6rem;
        color: var(--color-text-mute);
      }
    }
  }
}

.selected {
  background-color: var(--color-primary-mute) !important;
}

#quest-container:hover {
  background-color: var(--color-hover);
}
</style>