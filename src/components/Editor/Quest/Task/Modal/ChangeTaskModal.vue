<script setup lang="ts">
import Modal from '@/components/Control/Modal.vue';
import Button from '@/components/Control/Button.vue';
import { ref } from 'vue';

const model = defineModel();

const emit = defineEmits(['update']);

defineProps({
  taskId: String,
});

const newType = ref('');
</script>

<template>
  <Modal v-model="model">
    <template v-slot:header>
      <h2>Change the task type of '{{ taskId }}'</h2>
    </template>

    <template v-slot:body>
      <div id="body">
        <div class="option-group">
          <label for="new-type">New type</label>
          <input id="new-type" name="new-type" type="text" v-model="newType" />
        </div>
        <p>Any configured options for this task will be overwritten.</p>
        <div id="confirm" class="control-group">
          <Button
            :icon="['fas', 'fa-times']"
            :label="'Cancel'"
            @click="model = false"
          ></Button>
          <Button
            type="solid"
            :icon="['fas', 'fa-check']"
            :label="'Change'"
            @click="emit('update', newType)"
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