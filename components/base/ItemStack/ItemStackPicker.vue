<script setup lang="ts">
import { computed, ref } from 'vue';
import materials from '@/lib/materials';

const props = defineProps<{
  value: any;
}>();
const emit = defineEmits(['update']);

const value = ref(props.value);

const showItemStackModal = ref(false);

//TODO unshitify
const empty = computed(() => {
  return value.value === undefined
    || value.value === null
    || value.value === ''
    || (Array.isArray(value.value) && value.value.length === 0)
    || (typeof value.value === 'object' && Object.keys(value.value).length === 0);
});
const isQuestItem = computed(() => {
  return value.value?.['quest-item'] !== undefined;
});
const isItemStack = computed(() => {
  if (typeof value.value !== 'object' || value.value === null) {
    return false;
  }

  const key = 'item' in value.value
    ? 'item'
    : 'type' in value.value
      ? 'type'
      : 'material'

  return (!!value.value[key]);
});
const isMaterial = computed(() => {
  return typeof value.value === 'string' && materials.includes(value.value)
});

const update = (newValue: any) => {
  value.value = newValue;
  showItemStackModal.value = false;
  emit('update', value.value);
};
</script>

<template>
  <div class="itemstack" @click="showItemStackModal = true">
    <span v-if="empty" class="empty">ItemStack...</span>
    <span v-if="isQuestItem" class="item"><font-awesome-icon :icon="['fas', 'tag']" /> Quest Item</span>
    <span v-if="isItemStack" class="item"><font-awesome-icon :icon="['fas', 'cube']" /> ItemStack of '{{ value.type ||
    value.item || value.material }}'</span>
    <span v-if="isMaterial" class="item"><font-awesome-icon :icon="['fas', 'apple-whole']" /> {{ value }}</span>
    <span v-if="!empty && !isQuestItem && !isItemStack && !isMaterial" class="invalid"><font-awesome-icon
        :icon="['fas', 'triangle-exclamation']" /> Invalid ItemStack</span>
  </div>

  <ItemStackModal v-model="showItemStackModal" :value="value" @confirm="update" />
</template>

<style scoped>
.itemstack {
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

  .empty {
    color: var(--color-text-mute);
  }

  .item {
    color: var(--color-primary);
  }

  .invalid {
    color: var(--color-false);
  }

  &:hover {
    background-color: var(--color-hover);
  }
}
</style>