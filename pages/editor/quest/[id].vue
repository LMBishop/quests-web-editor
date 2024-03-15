<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { computed, ref } from 'vue';
import type EditorQuestModalYaml from '~/components/editor/quest/modal/EditorQuestModalYaml.vue';

definePageMeta({
  layout: 'editor',
});

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

const yamlModal = ref<InstanceType<typeof EditorQuestModalYaml> | null>(null);
const showDeleteModal = ref(false);
const showRenameModal = ref(false);
const showDuplicateModal = ref(false);

const renameQuest = (oldId: string, newId: string) => {
  sessionStore.changeQuestId(oldId, newId);
  navigateToEditorPane('quest', newId);
  showRenameModal.value = false;
};

const deleteQuest = (questId: string) => {
  sessionStore.deleteQuest(questId);
  navigateToEditorPane(null);
  showDeleteModal.value = false;
};

const duplicateQuest = (oldId: string, newId: string) => {
  sessionStore.duplicateQuest(oldId, newId);
  navigateToEditorPane('quest', newId);
  showDuplicateModal.value = false;
};

const showYaml = () => {
  yamlModal.value?.open();
};
</script>

<template>
  <PageHeader>
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
      <Button :icon="['fas', 'fa-code']" :label="'YAML'" @click="showYaml"></Button>
      <Button
        :icon="['fas', 'fa-copy']"
        :label="'Duplicate'"
        @click="showDuplicateModal = true"
      ></Button>
      <Button :icon="['fas', 'fa-pen']" :label="'Rename'" @click="showRenameModal = true"></Button>
      <Button
        :icon="['fas', 'fa-trash']"
        :label="'Delete'"
        @click="showDeleteModal = true"
      ></Button>
      <Button type="solid" :disabled="true" :icon="['fas', 'fa-save']" :label="'Save'"></Button>
    </span>
  </PageHeader>

  <div id="options-container">
    <EditorQuestOptionsPanel :questId="questId" />
    <EditorQuestTasksOptionsPanel :questId="questId" />
  </div>

  <EditorQuestModalYaml ref="yamlModal" :key="`yaml-quest-${questId}`" :questId="questId" />
  <EditorQuestModalDelete
    v-model="showDeleteModal"
    :key="`delete-quest-${questId}`"
    :questId="questId"
    @delete="() => questId && deleteQuest(questId)"
  />
  <EditorQuestModalRename
    v-model="showRenameModal"
    :key="`rename-quest-${questId}`"
    :questId="questId"
    @update="(newId: any) => questId && renameQuest(questId, newId)"
  />
  <EditorQuestModalDuplicate
    v-model="showDuplicateModal"
    :key="`duplicate-quest-${questId}`"
    :questId="questId"
    @duplicate="(newId: any) => questId && duplicateQuest(questId, newId)"
  />
</template>

<style scoped>
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
