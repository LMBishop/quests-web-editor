<script setup lang="ts">
import { useSessionStore, type EditorQuest } from '@/stores/session';
import { computed } from 'vue';
import Button from '@/components/Control/Button.vue';
import TaskConfigurationRow from '@/components/Editor/Quest/Task/TaskConfigurationRow.vue';

const props = defineProps<{
  taskId: string;
  quest: EditorQuest;
}>();

const sessionStore = useSessionStore();

const taskType = computed(() => props.quest.tasks[props.taskId].config.type);
const taskDefintion = computed(() => sessionStore.getTaskDefinitionByTaskType(taskType.value));

const taskConfig = computed(() => {
  return Object.keys(props.quest.tasks[props.taskId].config).filter((fieldName) => fieldName !== 'type').reduce((acc, fieldName) => {
    acc[fieldName] = props.quest.tasks[props.taskId].config[fieldName];
    return acc;
  }, {} as { [key: string]: any });
});

const requiredFields = computed(() => {
  return Object.keys(taskDefintion.value.configuration).filter((fieldName) => taskDefintion.value.configuration[fieldName].required);
});

const givenRequiredFields = computed(() => {
  return requiredFields.value.filter((fieldName) => taskConfig.value[fieldName]);
});

const missingFields = computed(() => {
  return requiredFields.value.filter((fieldName) => !props.quest.tasks[props.taskId].config[fieldName]);
});

const remainingGivenFields = computed(() => {
  return Object.keys(taskConfig.value).filter((fieldName) => !requiredFields.value.includes(fieldName));
});

const configKeysOptions = computed(() => Object.keys(taskDefintion.value.configuration).filter((key) => !Object.keys(taskConfig.value).some((fieldName) => fieldName === key)));
// const configKeysOptions = computed(() => {
//   const keys = Object.keys(taskDefintion.value.configuration).filter((key) => !Object.keys(taskConfig.value).some((fieldName) => fieldName === key));
// 
//   return keys.map((key) => {
//     return {
//       value: key,
//       description: taskDefintion.value.configuration[key].description,
//       note: taskDefintion.value.configuration[key].note,
//     };
//   });
// });

const onAddOption = (option: any) => {
  sessionStore.getQuestById(props.quest.id)!.tasks[props.taskId].config[option] = taskDefintion.value.configuration[option].default || null;
};

const updateValue = (fieldName: string, value: any) => {
  sessionStore.getQuestById(props.quest.id)!.tasks[props.taskId].config[fieldName] = value;
};

const deleteValue = (fieldName: string) => {
  delete sessionStore.getQuestById(props.quest.id)!.tasks[props.taskId].config[fieldName];
};

</script>

<template>
  <div id="task-configuration-table">
    <div id="task-header">
      <p id="task-id">
        <span id="task-name">
          {{ props.taskId }}         
        </span>
        <code>
          ({{ taskType }})
        </code>
      </p>
      <div id="task-controls">
        <Button
          :icon="['fas', 'fa-pen']"
          :label="'Change'"
        ></Button>
        <Button
          :icon="['fas', 'fa-trash']"
          :label="'Delete'"
        ></Button>
      </div>
    </div>
    <div id="task-configuration">
      <div v-if="!taskDefintion" class="error">
        <font-awesome-icon id="error-icon" :icon="['fas', 'fa-triangle-exclamation']"/>
        <p id="error-message">
          Unable to edit task <code>{{ props.taskId }}</code>.
        </p>
        <p id="error-description">
          The quests web editor does not know how to configure task 
          type <code>{{ taskType }}</code> as it has no task definition.
        </p>
      </div>
      
      <div v-if="taskDefintion">
        <TaskConfigurationRow 
          v-for="fieldName in [...givenRequiredFields, ...missingFields, ...remainingGivenFields]" 
          :key="fieldName" 
          :required="requiredFields.includes(fieldName)" 
          :configKey="fieldName" 
          :initialValue="taskConfig[fieldName]" 
          :taskType="taskType" 
          :type="(taskDefintion.configuration[fieldName].type as string)"
          @update="newValue => updateValue(fieldName, newValue)"
          @delete="() => deleteValue(fieldName)"
          />
        <div id="add-option">
          <multiselect
            class="multiselect"
            :options="configKeysOptions"
            :searchable="true"
            @select="onAddOption"
            placeholder="Add option...">
          </multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  padding: 0.5rem 0.5rem 0.5rem calc(0.5rem + 20px);

  #error-icon {
    float: left;
    margin: 5px 0 0 -20px;
  }
  
  #error-message {
    font-weight: 700;
  }
  
}
  
#task-configuration-table {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  
  #task-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-background-soft);
    padding: 0.5rem;

    #task-id {
      font-size: 1.2em;
      
      #task-name {
        font-weight: 700;
      }

      code {
        font-size: 0.8em;
        color: var(--color-text-mute);
      }
    }
    
    #task-controls {
      display: flex;
      gap: 1rem;
    }
  }
}

#add-option {
  width: 100%;
  border-right: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border);
}

.multiselect::v-deep .multiselect__tags {
  border: none !important;
  border-radius: 0px !important;
  background: transparent !important;
}

.multiselect::v-deep .multiselect__select {
  background: transparent !important;
}

</style>

