<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <div id="modal" class="modal" :class="{ 'is-active': model }">
    <div class="modal-background" @click="model = false"></div>
    <div class="modal-content">
      <div class="header" v-if="$slots.header">
        <slot name="header" />
      </div>
      <slot name="body" />
      <slot />
    </div>
  </div>
</template>

<style scoped>
#modal {
  align-items: start;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  display: none;
  overflow: auto;
}

.modal-content {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  margin-top: 4rem;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  /* max-height: 90%; */
  /* overflow-y: auto; */
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.is-active {
  opacity: 1 !important;
  pointer-events: all !important;
  display: flex !important;
}

.header {
  margin-bottom: 1rem;
}

:deep(.header) h2 {
  font-weight: 600;
  border-bottom: none;
}
</style>
