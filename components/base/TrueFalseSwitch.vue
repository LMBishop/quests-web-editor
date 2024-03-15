<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  value: boolean;
}>();
const emit = defineEmits(['update']);

const value = ref(props.value);

const invert = () => {
  value.value = !value.value;
  emit('update', value.value);
};
</script>

<template>
  <div class="switch" @click="invert">
    <span v-if="value" class="true"><font-awesome-icon :icon="['fas', 'check']" /> True</span>
    <span v-else class="false"><font-awesome-icon :icon="['fas', 'xmark']" /> False</span>
  </div>
</template>

<style scoped>
.switch {
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  align-items: center;
  padding: 0.5rem;
  user-select: none;
  transition: background-color 0.3s;
  background-color: var(--color-background-soft);

  span {
    font-family: monospace;
    font-size: 0.8rem;
  }

  .true {
    color: var(--color-text-primary);
  }

  .false {
    color: var(--color-false);
  }

  &:hover {
    background-color: var(--color-hover);
  }
}
</style>
