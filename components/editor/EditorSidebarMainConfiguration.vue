<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();

const setSelected = () => {
  navigateToEditorPane('config');
};

const selected = computed(() => {
  return route.path.startsWith('/editor/config');
});
</script>

<template>
  <div id="container" :class="{ selected: selected }">
    <span id="title" @click="setSelected">
      <font-awesome-icon class="icon" :icon="['fas', 'wrench']" />
      <span id="name"> Configuration </span>
    </span>
  </div>
</template>

<style scoped>
#container {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
  max-height: 45px;
  overflow-y: hidden;

  #title {
    display: flex;
    align-items: center;
    margin: 0;
    gap: 1rem;
    font-size: 1.1rem;

    #name {
      display: flex;
      flex-direction: column;
      align-items: left;
    }
  }
}

.selected {
  background-color: var(--color-primary-mute);
}

#container:hover {
  background-color: var(--color-hover);
}
</style>
