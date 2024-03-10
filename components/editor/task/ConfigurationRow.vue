<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { computed, ref, toRefs, watch } from 'vue';
import materials from '@/lib/materials';

const props = defineProps({
  taskType: {
    type: String,
    required: true,
  },
  configKey: {
    type: String,
    required: true,
  },
  initialValue: null,
  type: String,
  required: Boolean,
});
const emit = defineEmits(['update', 'delete']);

const sessionStore = useSessionStore();

const definition = computed(() => {
  const def = sessionStore.getTaskDefinitionByTaskType(props.taskType).configuration[props.configKey];
  return { description: def.description, note: def.note };
});

const { description, note } = toRefs(definition.value);
const showDescription = ref(false);
const currentValue = ref(props.initialValue ||
  (props.type === 'boolean'
    ? false
    : (props.type === 'material-list' || props.type === 'string-list'
      ? []
      : props.type === 'itemstack'
        ? null
        : ''
    )));

if (props.initialValue !== currentValue.value) {
  emit('update', currentValue.value);
}

const error = computed(() => currentValue.value === undefined || currentValue.value === null || currentValue.value === '' || (Array.isArray(currentValue.value) && currentValue.value.length === 0));
const updateValue = (value: any) => {
  currentValue.value = value;
};

watch(currentValue, () => {
  emit('update', currentValue.value);
});

const addValue = (searchQuery: any) => {
  currentValue.value.push(searchQuery);
};

</script>

<template>
  <div id="task-configuration-row">
    <div id="key">
      <div id="delete" @click="emit('delete')" v-if="!props.required" class="delete">
        <font-awesome-icon :icon="['fas', 'fa-xmark']" />
      </div>
      <p id="name" @click="showDescription = !showDescription">{{ props.configKey }}</p>
    </div>
    <div id="value">
      <div id="value-container">
        <!-- Data type 'string' -->
        <input v-if="props.type === 'string'" v-model="currentValue" />

        <!-- Data type 'number' -->
        <input v-else-if="props.type === 'number'" type="number" v-model="currentValue" />

        <!-- Data type 'boolean' -->
        <TrueFalseSwitch v-else-if="props.type === 'boolean'" :value="!!currentValue" @update="updateValue" />

        <!-- Data type 'material-list' -->
        <multiselect v-else-if="props.type === 'material-list'" v-model="currentValue" :options="materials"
          :multiple="true" :taggable="true" :searchable="true" placeholder="Enter material name" />

        <!-- Data type 'string-list' -->
        <multiselect v-else-if="props.type === 'string-list'" v-model="currentValue" :options="[]" @tag="addValue"
          :multiple="true" :taggable="true" :searchable="true" placeholder="Enter string" />

        <!-- Data type 'itemstack' -->
        <ItemStackPicker v-else-if="props.type === 'itemstack'" :value="currentValue" @update="updateValue" />

        <div v-if="showDescription || error" id="task-configuration-row-info">
          <p v-if="error" class="error">A value is required.</p>
          <p>{{ description }} <i>{{ note }}</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#task-configuration-row {
  display: flex;
  flex-direction: row;
  transition: background-color 0.3s;
  border-bottom: 1px solid var(--color-border);

  #key {
    width: 25%;
    background-color: var(--color-background);
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;

    #delete {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 100%;
      cursor: pointer;
      color: var(--color-text-mute);
      border-right: 1px solid var(--color-border);
      background-color: var(--color-background-soft);
      transition: color 0.3s;

      &:hover {
        color: var(--color-false);
      }
    }

    #name {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      padding: 0.5rem;
      width: 100%;
      height: 100%;
      font-family: monospace;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: var(--color-hover);
      }
    }
  }

  #value {
    width: 75%;
    background-color: var(--color-background);
    border-left: 1px solid var(--color-border);

    #value-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}

#task-configuration-row:hover {
  background-color: var(--color-hover);
}

#task-configuration-row-info {
  padding: 0.25rem 0.5rem;
  font-size: 0.8em;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border);
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0;
  border: none;
  font-family: monospace;
  font-size: 0.8rem;
  height: 40px;
}

.error {
  color: var(--color-false);
}

.multiselect::v-deep .multiselect__tags {
  border: unset !important;
  border-radius: 0px !important;
}

.multiselect::v-deep .multiselect__select {
  background: unset !important;
}
</style>