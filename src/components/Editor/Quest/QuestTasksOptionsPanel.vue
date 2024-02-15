<script setup lang="ts">
import { useSessionStore, type EditorQuest } from '@/stores/session';
import { computed } from 'vue';
import EditorOptionsPanel from '@/components/Editor/EditorOptionsPanel.vue';
import TaskConfiguration from '@/components/Editor/Quest/Task/TaskConfiguration.vue';
import Button from '@/components/Control/Button.vue';

const props = defineProps<{
  questId: string;
}>();

const sessionStore = useSessionStore();

const quest = computed(() => {
  return sessionStore.getQuestById(props.questId) as EditorQuest;
});
</script>

<template>
  <EditorOptionsPanel v-if="quest">
    <div id="options">
      <h2>Tasks <code>({{ Object.keys(quest.tasks).length }})</code></h2>
      
      <TaskConfiguration v-for="(task, taskId) in quest.tasks" :key="taskId" :taskId="String(taskId)" :quest="quest" />
      
      <div id="controls">
        <Button
          id="add-task"
          :icon="['fas', 'fa-plus']"
          type="solid"
          label="Add task" 
          />
      </div>
    </div>
  </EditorOptionsPanel>
</template>


<style scoped>
#options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  #controls {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
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
  
  code {
    font-size: 0.8em;
    color: var(--color-text-mute);
  }
}
</style>

