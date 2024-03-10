<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { computed, ref } from 'vue';
import { stripColorCodes } from '@/lib/util';
import QuestOptionsPanel from '@/components/Editor/Quest/QuestOptionsPanel.vue';
import QuestTasksOptionsPanel from '@/components/Editor/Quest/QuestTasksOptionsPanel.vue';
import Button from '@/components/Control/Button.vue';
import DeleteQuestModal from '@/components/Editor/Quest/Modal/DeleteQuestModal.vue';
import RenameQuestModal from '@/components/Editor/Quest/Modal/RenameQuestModal.vue';
import DuplicateQuestModal from '@/components/Editor/Quest/Modal/DuplicateQuestModal.vue';

definePageMeta({
  layout: 'editor'
})

const sessionStore = useSessionStore();
const route = useRoute();

const questId = route.params.id as string;
const quest = sessionStore.getQuestById(questId);


const categoryFromSelectedQuest = computed(() => {
  const quest = sessionStore.getQuestById(questId);
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
  <div id="header">
    <span id="path">
      <template v-if="categoryFromSelectedQuest">
        <font-awesome-icon class="icon" :icon="['fas', 'fa-folder']" />
        {{ stripColorCodes(categoryFromSelectedQuest?.display.name) }}
        <font-awesome-icon class="chevron" :icon="['fas', 'fa-chevron-right']" />
      </template>
      <font-awesome-icon class="icon" :icon="['far', 'fa-compass']" />
      <span class="title" v-if="quest">{{ stripColorCodes(quest.display.name) }} </span>
      <code>({{ questId }})</code>
    </span>
    <span id="controls" class="control-group">
      <Button :icon="['fas', 'fa-code']" :label="'YAML'"></Button>
      <Button :icon="['fas', 'fa-copy']" :label="'Duplicate'" @click="showDuplicateModal = true"></Button>
      <Button :icon="['fas', 'fa-pen']" :label="'Rename'" @click="showRenameModal = true"></Button>
      <Button :icon="['fas', 'fa-trash']" :label="'Delete'" @click="showDeleteModal = true"></Button>
      <Button type="solid" :disabled="true" :icon="['fas', 'fa-save']" :label="'Save'"></Button>
    </span>
  </div>

  <div id="options-container">
    <QuestOptionsPanel :questId="questId" />
    <QuestTasksOptionsPanel :questId="questId" />
  </div>

  <DeleteQuestModal v-model="showDeleteModal" :key="`delete-quest-${questId}`" :questId="questId"
    @delete="() => questId && deleteQuest(questId)" />
  <RenameQuestModal v-model="showRenameModal" :key="`rename-quest-${questId}`" :questId="questId"
    @update="newId => questId && renameQuest(questId, newId)" />
  <DuplicateQuestModal v-model="showDuplicateModal" :key="`duplicate-quest-${questId}`" :questId="questId"
    @duplicate="newId => questId && duplicateQuest(questId, newId)" />
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