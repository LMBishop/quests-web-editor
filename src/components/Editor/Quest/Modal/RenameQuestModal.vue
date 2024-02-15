<script setup lang="ts">
import Modal from '@/components/Control/Modal.vue';
import Button from '@/components/Control/Button.vue';
import { ref } from 'vue';

const model = defineModel();

const emit = defineEmits(['update']);

const props = defineProps({
  questId: String,
});

const newQuestId = ref(props.questId);
</script>

<template>
  <Modal v-model="model">
    <template v-slot:header>
      <h2>Rename quest '{{ questId }}'</h2>
    </template>

    <template v-slot:body>
      <div id="body">
        <div class="option-group">
          <label for="new-type">New quest ID</label>
          <input id="new-type" name="new-type" type="text" v-model="newQuestId" />
        </div>
        <p>A Quest ID must be unique, alphanumeric, and not contain any spaces.</p>
        <div id="confirm" class="control-group">
          <Button
            :icon="['fas', 'fa-times']"
            :label="'Cancel'"
            @click="model = false"
          ></Button>
          <Button
            type="solid"
            :icon="['fas', 'fa-check']"
            :label="'Rename'"
            @click="emit('update', newQuestId)"
          ></Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
#confirm {
  display: flex;
  justify-content: flex-end;
}

#body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>