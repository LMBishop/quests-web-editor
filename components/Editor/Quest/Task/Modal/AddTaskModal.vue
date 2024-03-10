<script setup lang="ts">
import Modal from '@/components/Control/Modal.vue';
import Button from '@/components/Control/Button.vue';
import { computed, ref } from 'vue';
import { useSessionStore } from '@/stores/session';
import { validateTaskId } from '@/lib/util';

const model = defineModel();

const emit = defineEmits(['add']);

const session = useSessionStore();

const props = defineProps({
  questId: {
    type: String,
    required: true,
  },
});

const knownTasks = computed(() => session.getQuestById(props.questId)!.tasks);
const knownTaskTypes = computed(() => session.getKnownTaskTypes());

const newId = ref('');
const newType = ref('');
const unknownTaskType = computed(() => !knownTaskTypes.value.includes(newType.value));
const invalidTaskId = computed(() => !validateTaskId(newId.value));
const duplicateTaskId = computed(() => knownTasks.value[newId.value] !== undefined);

const newTypeDescription = computed(() => session.getTaskDefinitionByTaskType(newType.value)?.description);
</script>

<template>
  <Modal v-model="model">
    <template v-slot:header>
      <h2>Add new task</h2>
    </template>

    <template v-slot:body>
      <div id="body">
        <div class="option-group">
          <label for="new-type">Task ID</label>
          <input id="new-id" name="new-id" type="text" v-model="newId" />
          <p v-if="invalidTaskId" class="error-text">Invalid task ID.</p>
          <p v-if="duplicateTaskId" class="error-text">Task ID already exists.</p>
        </div>
        <div class="option-group">
          <label for="new-type">Task type</label>
          <multiselect
            id="new-type"
            v-model="newType"
            :options="knownTaskTypes"
            :searchable="true"
            placeholder="Select a new type"
          ></multiselect>
          <p v-if="unknownTaskType" class="error-text">Invalid task type.</p>
        </div>
        <p v-if="newTypeDescription">{{ newTypeDescription }}</p>
        <p>A task ID must be unique, alphanumeric, and not contain any spaces.</p>
        <div id="confirm" class="control-group">
          <Button
            :icon="['fas', 'fa-times']"
            :label="'Cancel'"
            @click="model = false"
          ></Button>
          <Button
            type="solid"
            :icon="['fas', 'fa-check']"
            :label="'Confirm'"
            :disabled="unknownTaskType || invalidTaskId || duplicateTaskId"
            @click="emit('add', newId, newType)"
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