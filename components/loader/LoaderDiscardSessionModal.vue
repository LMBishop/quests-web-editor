<script setup lang="ts">
const session = useSessionStore();

const showModal = ref(false);

const open = () => {
  showModal.value = true;
};

const confirm = () => {
  session.setQuests([]);
  session.setCategories([]);
  session.setItems([]);
  session.setSessionType('none');

  navigateToEditorPane(null);

  showModal.value = false;
};

defineExpose({
  open,
});
</script>

<template>
  <Modal v-model="showModal">
    <template v-slot:header>
      <h2>Discard current session</h2>
    </template>

    <p>
      You are about to discard your current session. All changes will be lost. Do you want to
      continue?
    </p>

    <div id="controls" class="control-group">
      <Button :icon="['fas', 'xmark']" :label="'Cancel'" @click="showModal = false"></Button>
      <Button
        type="solid"
        accent="danger"
        :icon="['fas', 'trash']"
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
