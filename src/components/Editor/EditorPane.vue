<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { computed, ref } from 'vue';
import { stripColourCodes } from '@/lib/util';
import QuestOptionsPanel from '@/components/Editor/Quest/QuestOptionsPanel.vue';
import QuestTasksOptionsPanel from '@/components/Editor/Quest/QuestTasksOptionsPanel.vue';
import CategoryOptionsPanel from '@/components/Editor/Category/CategoryOptionsPanel.vue';
import CategoryChildrenOptionsPanel from '@/components/Editor/Category/CategoryChildrenOptionsPanel.vue';
import Button from '@/components/Control/Button.vue';
import DeleteQuestModal from '@/components/Editor/Quest/Modal/DeleteQuestModal.vue';
import RenameQuestModal from '@/components/Editor/Quest/Modal/RenameQuestModal.vue';

const sessionStore = useSessionStore();

const selectedType = computed(() => sessionStore.editor.selected.type);
const selectedId = computed(() => sessionStore.editor.selected.id);
const selectedName = computed(() => {
  if (selectedType.value === 'Quest') {
    return sessionStore.getQuestById(selectedId.value)?.display.name;
  } else if (selectedType.value === 'Category') {
    return sessionStore.getCategoryById(selectedId.value)?.display.name;
  } else {
    return '';
  }
});

const categoryFromSelectedQuest = computed(() => {
  const quest = sessionStore.getQuestById(selectedId.value);
  if (quest) {
    return sessionStore.getCategoryById(quest.options.category) || null;
  } else {
    return null;
  }
});

const showDeleteModal = ref(false);
const showRenameModal = ref(false);
</script>

<template>
  <div id="pane-container" v-if="!selectedId || !selectedType">
    <h1 class="none-selected">Select a quest or category from the sidebar to continue</h1>
  </div>
  <div id="pane-container" v-if="selectedId && selectedType">
    <div id="header">
      <span id="path">
        <template v-if="selectedType === 'Quest'">
          <template v-if="categoryFromSelectedQuest">
            <font-awesome-icon class="icon" :icon="['fas', 'fa-folder']"/>
            {{ stripColourCodes(categoryFromSelectedQuest?.display.name) }} 
            <font-awesome-icon class="chevron" :icon="['fas', 'fa-chevron-right']"/>
          </template>
          <font-awesome-icon class="icon" :icon="['far', 'fa-compass']"/>
          <span class="title">{{ stripColourCodes(selectedName!) }} </span>
          <code>({{ selectedId }})</code>
        </template>
        <template v-if="selectedType === 'Category'">
          <font-awesome-icon class="icon" :icon="['fas', 'fa-folder']"/>
          <span class="title">{{ stripColourCodes(selectedName!) }} </span>
          <code>({{ selectedId }})</code>
        </template>
      </span>
      <span id="controls" class="control-group">
        <Button
          v-if="selectedType === 'Quest'"
          :icon="['fas', 'fa-code']"
          :label="'YAML'"
        ></Button>
        <Button
          :icon="['fas', 'fa-pen']"
          :label="'Rename'"
          @click="showRenameModal = true"
        ></Button>
        <Button
          :icon="['fas', 'fa-trash']"
          :label="'Delete'"
          @click="showDeleteModal = true"
        ></Button>
      </span>
    </div>    
    
    <div id="options-container">
      <QuestOptionsPanel v-if="selectedType === 'Quest'" :questId="selectedId" />
      <QuestTasksOptionsPanel v-if="selectedType === 'Quest'" :questId="selectedId" />

      <CategoryOptionsPanel v-if="selectedType === 'Category'" :categoryId="selectedId" />
      <CategoryChildrenOptionsPanel v-if="selectedType === 'Category'" :categoryId="selectedId" />
    </div> 
  </div>
  
  <DeleteQuestModal
    v-if="selectedType === 'Quest'"
    v-model="showDeleteModal"
    :questId="selectedId"
  /> 
  <RenameQuestModal
    v-if="selectedType === 'Quest'"
    v-model="showRenameModal"
    :questId="selectedId"
  />
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
  overflow: scroll;
  max-height: calc(100% - 55px);
}

header {
  border-bottom: 1px solid var(--color-border);
}
</style>