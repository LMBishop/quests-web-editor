<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { computed, ref } from 'vue';
import { stripColorCodes } from '@/lib/util';
import QuestOptionsPanel from '@/components/Editor/Quest/QuestOptionsPanel.vue';
import QuestTasksOptionsPanel from '@/components/Editor/Quest/QuestTasksOptionsPanel.vue';
import CategoryOptionsPanel from '@/components/Editor/Category/CategoryOptionsPanel.vue';
import CategoryChildrenOptionsPanel from '@/components/Editor/Category/CategoryChildrenOptionsPanel.vue';
import Button from '@/components/Control/Button.vue';
import DeleteQuestModal from '@/components/Editor/Quest/Modal/DeleteQuestModal.vue';
import RenameQuestModal from '@/components/Editor/Quest/Modal/RenameQuestModal.vue';
import DuplicateQuestModal from '@/components/Editor/Quest/Modal/DuplicateQuestModal.vue';

const sessionStore = useSessionStore();

const selectedType = computed(() => sessionStore.editor.selected.type);
const selectedId = computed(() => sessionStore.editor.selected.id);

const selectedName = computed(() => {
  if (selectedType.value === 'Quest' && selectedId.value) {
    return sessionStore.getQuestById(selectedId.value)?.display.name;
  } else if (selectedType.value === 'Category' && selectedId.value) {
    return sessionStore.getCategoryById(selectedId.value)?.display.name;
  } else {
    return '';
  }
});

const categoryFromSelectedQuest = computed(() => {
  if (!selectedId.value || selectedType.value !== 'Quest') return null;
  
  const quest = sessionStore.getQuestById(selectedId.value);
  if (quest) {
    return sessionStore.getCategoryById(quest.options.category) || null;
  } else {
    return null;
  }
});

const showDeleteModal = ref(false);
const showRenameModal = ref(false);
const showDuplicateModal = ref(false);

const renameQuest = (oldId: string, newId: string) => {
  sessionStore.changeQuestId(oldId, newId);
  sessionStore.editor.selected.id = newId;
  showRenameModal.value = false;
};

const deleteQuest = (questId: string) => {
  sessionStore.deleteQuest(questId);
  sessionStore.setEditorSelected(null, null);
  showDeleteModal.value = false;
};

const duplicateQuest = (oldId: string, newId: string) => {
  sessionStore.duplicateQuest(oldId, newId);
  sessionStore.editor.selected.id = newId;
  showDuplicateModal.value = false;
};
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
            {{ stripColorCodes(categoryFromSelectedQuest?.display.name) }} 
            <font-awesome-icon class="chevron" :icon="['fas', 'fa-chevron-right']"/>
          </template>
          <font-awesome-icon class="icon" :icon="['far', 'fa-compass']"/>
          <span class="title">{{ stripColorCodes(selectedName!) }} </span>
          <code>({{ selectedId }})</code>
        </template>
        <template v-if="selectedType === 'Category'">
          <font-awesome-icon class="icon" :icon="['fas', 'fa-folder']"/>
          <span class="title">{{ stripColorCodes(selectedName!) }} </span>
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
          v-if="selectedType === 'Quest'"
          :icon="['fas', 'fa-copy']"
          :label="'Duplicate'"
          @click="showDuplicateModal = true"
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
        <Button
          type="solid"
          :disabled="true"
          :icon="['fas', 'fa-save']"
          :label="'Save'" 
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
    v-if="selectedType === 'Quest' && selectedId"
    v-model="showDeleteModal"
    :key="`delete-quest-${selectedId}`"
    :questId="selectedId"
    @delete="() => selectedId && deleteQuest(selectedId)"
  /> 
  <RenameQuestModal
    v-if="selectedType === 'Quest' && selectedId"
    v-model="showRenameModal"
    :key="`rename-quest-${selectedId}`"
    :questId="selectedId"
    @update="newId => selectedId && renameQuest(selectedId, newId)"
  />
  <DuplicateQuestModal
    v-if="selectedType === 'Quest' && selectedId"
    v-model="showDuplicateModal"
    :key="`duplicate-quest-${selectedId}`"
    :questId="selectedId"
    @duplicate="newId => selectedId && duplicateQuest(selectedId, newId)"
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