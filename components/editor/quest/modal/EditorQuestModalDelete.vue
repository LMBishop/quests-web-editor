<script setup lang="ts">
const model = defineModel();

const emit = defineEmits(['delete']);

defineProps({
  questId: String,
});
</script>

<template>
  <Modal v-model="model">
    <template v-slot:header>
      <h2>Really delete quest '{{ questId }}'?</h2>
    </template>
    <p>
      Are you sure you want to delete this quest? The quests editor does not have undo functionality
      (yet)!
    </p>
    <div id="confirm" class="control-group">
      <Button :icon="['fas', 'times']" :label="'Cancel'" @click="model = false"></Button>
      <Button
        type="solid"
        :icon="['fas', 'trash']"
        :label="'Delete'"
        @click="emit('delete')"
      ></Button>
    </div>
  </Modal>
</template>

<style scoped>
#confirm {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
