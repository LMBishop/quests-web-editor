<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: false,    
    default: 'text',
  },
  label: String,
  icon: Array<String>,
});
</script>

<template>
  <a id="button" :class="{text: type === 'text', solid: type === 'solid'}" >
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
}

.solid {
  background-color: var(--color-primary);
  transition: background-color 0.3s;
  color: var(--color-text);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
}

.text:hover {
  color: var(--color-primary-dark);
}

.solid:hover {
  background-color: var(--color-primary-dark);
}
    
</style>