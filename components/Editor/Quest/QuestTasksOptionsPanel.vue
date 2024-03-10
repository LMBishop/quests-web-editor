<script setup lang="ts">
import { useSessionStore, type EditorQuest } from '@/stores/session';
import { computed, ref } from 'vue';
import EditorOptionsPanel from '@/components/Editor/EditorOptionsPanel.vue';
import TaskConfiguration from '@/components/Editor/Quest/Task/TaskConfiguration.vue';
import Button from '@/components/Control/Button.vue';
import AddTaskModal from './Task/Modal/AddTaskModal.vue';

const props = defineProps<{
  questId: string;
}>();

const sessionStore = useSessionStore();

const quest = computed(() => {
  return sessionStore.getQuestById(props.questId) as EditorQuest;
});

const showAddTaskModal = ref(false);

const addTask = (newId: string, newType: string) => {
  sessionStore.getQuestById(props.questId)!.tasks[newId] = {
    id: newId,
    config: {
      type: newType,
    },
  };
  
  showAddTaskModal.value = false;
};
</script>

<template>
  <EditorOptionsPanel v-if="quest">
    <div id="options">
      <h2>Tasks <code>({{ Object.keys(quest.tasks).length }})</code></h2>
      
      <p v-if="Object.keys(quest.tasks).length === 0" class="error-text">This quest does not have any tasks.</p>
      <TaskConfiguration v-for="(task, taskId) in quest.tasks" :key="taskId" :taskId="String(taskId)" :quest="quest" />
      
      <div id="controls">
        <Button
          id="add-task"
          :icon="['fas', 'fa-plus']"
          type="solid"
          label="Add task" 
          @click="showAddTaskModal = true"
          />
      </div>
    </div>
  </EditorOptionsPanel>
  
  <AddTaskModal
    v-if="quest"
    v-model="showAddTaskModal"
    :questId="questId"
    @add="addTask"
  />
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

