<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSessionStore } from '@/stores/session';

const model = defineModel();

const emit = defineEmits(['update']);

const session = useSessionStore();

const props = defineProps({
  taskId: String,
  currentTaskType: String,
});

const knownTaskTypes = computed(() => session.getKnownTaskTypes());

const newType = ref('');
const unknownTaskType = computed(() => !knownTaskTypes.value.includes(newType.value));
const noChange = computed(() => newType.value === props.currentTaskType);
const newTypeDescription = computed(() => session.getTaskDefinitionByTaskType(newType.value)?.description);
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
          <multiselect id="new-type" v-model="newType" :options="knownTaskTypes" :searchable="true"
            placeholder="Select a new type"></multiselect>
        </div>
        <p v-if="unknownTaskType" class="error-text">Invalid task type.</p>
        <p v-if="newTypeDescription">{{ newTypeDescription }}</p>
        <p>Any configured options for this task will be overwritten.</p>
        <div id="confirm" class="control-group">
          <Button :icon="['fas', 'times']" :label="'Cancel'" @click="model = false"></Button>
          <Button type="solid" :icon="['fas', 'check']" :label="'Change'" :disabled="unknownTaskType || noChange"
            @click="emit('update', newType)"></Button>
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