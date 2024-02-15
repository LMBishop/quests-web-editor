<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: false,    
    default: 'text',
  },
  label: String,
  icon: Array<String>,
  disabled: Boolean,
});

const emit = defineEmits(['click']);

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <a id="button" :class="{text: type === 'text', solid: type === 'solid', disabled: disabled}" @click.stop="onClick">
    <font-awesome-icon :icon="icon" />
    {{ label }}
  </a>
</template>

<style scoped>
#button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  user-select: none;
}
    
.text {
  background-color: transparent;
  color: var(--color-text-primary);
  transition: color 0.3s;
  font-weight: 700;
  cursor: pointer;
  
  &.disabled {
    color: var(--color-text-mute);
    cursor: not-allowed;
  }
  
  &:hover {
    color: var(--color-primary-dark);
  }
  
  &.disabled:hover {
    color: var(--color-text-mute);
  }
}

.solid {
  background-color: var(--color-primary);
  transition: background-color 0.3s;
  color: var(--color-text);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  
  &.disabled {
    background-color: var(--color-border);
    color: var(--color-text-mute);
    cursor: not-allowed;
  }
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
  
  &.disabled:hover {
    background-color: var(--color-border);
  }
}

</style>