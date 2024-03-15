<script setup lang="ts">
const loader = useLoaderStore();
const session = useSessionStore();

const showModal = ref(false);

const open = () => {
  showModal.value = true;
};

const confirm = () => {
  const categories = loader.getCategories();
  const quests = loader.getQuests();
  const items = loader.getItems();

  session.setCategories(categories);
  session.setQuests(quests);
  session.setItems(items);
  session.setSessionType('filesystem');

  navigateToEditorPane(null);

  showModal.value = false;
};

const status = computed(() => loader.getFileSystemLoaderStatus());
const questsCount = computed(() => loader.getQuests().length);
const categoriesCount = computed(() => loader.getCategories().length);
const itemsCount = computed(() => loader.getItems().length);
const path = computed(() => loader.getPath());

defineExpose({
  open,
});
</script>

<template>
  <Modal v-model="showModal">
    <template v-slot:header>
      <h2>Import from Filesystem</h2>
    </template>

    <div v-if="status === 'pending'">
      <p>Select the Quests plugin data directory.</p>
      <p>Waiting for selection...</p>
    </div>

    <div v-if="status === 'inactive'">
      <p>The request was aborted.</p>
    </div>

    <div v-if="status === 'loaded'">
      <p>
        Parsing files in directory <code>{{ path }}</code
        >...
      </p>
    </div>

    <div v-if="status === 'invalid'">
      <p>You have selected an invalid directory.</p>
    </div>

    <div v-if="status === 'valid'">
      <p>
        Successfully parsed directory <code>{{ path }}</code
        >.
      </p>
      <ul>
        <li>{{ categoriesCount }} categories loaded</li>
        <li>{{ questsCount }} quests loaded</li>
        <li>{{ itemsCount }} items loaded</li>
      </ul>
      <p>You are about to replace your current workspace. Are you sure you want to continue?</p>
    </div>

    <div id="controls" class="control-group">
      <Button :icon="['fas', 'xmark']" :label="'Cancel'" @click="showModal = false"></Button>
      <Button
        v-if="status === 'valid'"
        type="solid"
        :icon="['fas', 'check']"
        :label="'Confirm'"
        @click="confirm"
      ></Button>
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
