<script setup lang="ts">
import { useSessionStore, type EditorCategory } from '@/stores/session';
import { computed } from 'vue';

const props = defineProps<{
  categoryId: string;
}>();

const sessionStore = useSessionStore();

const category = computed(() => {
  return sessionStore.getCategoryById(props.categoryId) as EditorCategory;
});
</script>

<template>
  <EditorOptionsPanel v-if="category">
    <div id="options">
      <div class="option-group">
        <Checkbox id="category-permissionrequired" label="Require permission for category"
          description="Players must have permission to open and start quests in this category."
          v-model="category.permissionRequired" />
      </div>
    </div>
  </EditorOptionsPanel>
</template>

<style>
#options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description {
  font-size: 0.8em;
}

label {
  font-weight: 700;
}

h2 {
  border-bottom: 1px solid var(--color-border);
}
</style>
