<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps<{
  item: EditorItem;
}>();

const { item } = toRefs(props);

const route = useRoute();

const setSelectedItem = () => {
  navigateToEditorPane('item', item.value.id);
};

const selected = computed(() => {
  return route.path.startsWith('/editor/item') && route.params.id === item.value.id;
});
</script>

<template>
  <div id="item-container" @click.stop="setSelectedItem" :class="{ selected: selected }">
    <span id="item-title">
      <font-awesome-icon class="item-icon" :icon="['fas', 'cube']" />
      <span id="item-name">
        <span id="item-display-id">{{ item.id }}</span>
        <code id="item-display-type">{{ item.type }}</code>
      </span>
    </span>
  </div>
</template>

<style scoped>
#item-container {
  cursor: pointer;
  padding: 0.3rem 1rem;
  transition: background-color 0.3s;

  #item-title {
    display: flex;
    align-items: center;
    margin: 0;
    gap: 0.6rem;
    font-size: 0.8rem;

    #item-name {
      display: flex;
      flex-direction: column;
      align-items: left;

      #item-display-type {
        font-size: 0.6rem;
        color: var(--color-text-mute);
      }
    }
  }
}

.selected {
  background-color: var(--color-primary-mute) !important;
}

#item-container:hover {
  background-color: var(--color-hover);
}
</style>