<script setup lang="ts">
import { loadCategoriesFromJson, loadItemsFromJson, loadQuestsFromJson } from '~/lib/questsLoader';
import testData from '@/data/testData.json';

const session = useSessionStore();

const showModal = ref(false);

const open = () => {
  showModal.value = true;
}

const confirm = () => {
  const quests = loadQuestsFromJson(testData.quests);
  const categories = loadCategoriesFromJson(testData.categories);
  const items = loadItemsFromJson(testData.items);

  session.setQuests(quests);
  session.setCategories(categories);
  session.setItems(items);
  session.setSessionType('demo');

  navigateToEditorPane(null);

  showModal.value = false;
}

defineExpose({
  open
})
</script>

<template>
  <Modal v-model="showModal">
    <template v-slot:header>
      <h2>Import test data</h2>
    </template>

    <p>You can view a demo of the Quests editor by loading test data. This will replace your current workspace.
      Do you want to continue?</p>

    <div id="controls" class="control-group">
      <Button :icon="['fas', 'xmark']" :label="'Cancel'" @click="showModal = false"></Button>
      <Button type="solid" :icon="['fas', 'check']" :label="'Confirm'" @click="confirm"></Button>
    </div>
  </Modal>
</template>

<style scoped>
#controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>