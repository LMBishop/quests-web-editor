<script setup lang="ts">
import { computed, ref } from 'vue';
import materials from '@/lib/materials';

const model = defineModel();
const emit = defineEmits(['confirm']);
const props = defineProps<{
  value: any
}>();
const session = useSessionStore();

//TODO unshitify
const value = ref<any>(props.value);

const isQuestItem = computed(() => {
  return value.value?.['quest-item'] !== undefined;
});
const isItemStack = computed(() => {
  return (
    typeof value.value === 'object'
    && (
      value.value?.item !== undefined
      || value.value?.type !== undefined
      || value.value?.material !== undefined
    ))
});
const isMaterial = computed(() => {
  return typeof value.value === 'string' && materials.includes(value.value)
});

const selectedType = ref(
  isQuestItem.value
    ? 'questitem'
    : isItemStack.value
      ? 'itemstack'
      : isMaterial.value
        ? 'material'
        : ''
);

const noTypeSelected = computed(() => selectedType.value === '');
const noValue = computed(() => !isQuestItem.value && !isItemStack.value && !isMaterial.value);

const selectedQuestItem = computed({
  get() {
    return value.value?.['quest-item'];
  },
  set(newValue: string) {
    value.value = {}
    value.value['quest-item'] = newValue;
  }
})
const knownQuestItems = computed(() => { return session.session.items.map((item) => item.id) });

const setSelectedType = (type: string) => {
  if (type === 'questitem') {
    value.value = {};
  } else if (type === 'itemstack') {
    value.value = {};
  } else if (type === 'material') {
    value.value = '';
  }
  selectedType.value = type;
};

const confirm = () => {
  emit('confirm', value.value);
};
</script>

<template>
  <Modal v-model="model">
    <template v-slot:header>
      <h2>Edit ItemStack</h2>
    </template>

    <template v-slot:body>
      <div id="type">
        <span class="option" @click="setSelectedType('questitem')" :class="{ selected: selectedType === 'questitem' }">
          <span>
            <font-awesome-icon :icon="['fas', 'tag']" />
            Quest Item
          </span>
          <p v-if="noTypeSelected">Re-use a quest item.</p>
        </span>
        <span class="option" @click="setSelectedType('itemstack')" :class="{ selected: selectedType === 'itemstack' }">
          <span>
            <font-awesome-icon :icon="['fas', 'cube']" />
            ItemStack
          </span>
          <p v-if="noTypeSelected">Define a new item stack.</p>
        </span>
        <span class="option" @click="setSelectedType('material')" :class="{ selected: selectedType === 'material' }">
          <span>
            <font-awesome-icon :icon="['fas', 'apple-whole']" />
            Material
          </span>
          <p v-if="noTypeSelected">Define a specific item type.</p>
        </span>
      </div>

      <div id="material" class="option-group" v-if="selectedType === 'material'">
        <label for="material">Material</label>
        <multiselect v-model="value" :options="materials" :searchable="true" placeholder="Enter material name" />
      </div>

      <div id="itemstack" class="option-group" v-if="selectedType === 'itemstack'">
        <ItemStackForm v-model="value" />
      </div>

      <div id="quest-item" class="option-group" v-if="selectedType === 'questitem'">
        <label for="quest-item">Quest Item</label>
        <multiselect v-model="selectedQuestItem" :options="knownQuestItems" :searchable="true"
          placeholder="Enter quest item" />
      </div>

      <div id="confirm" class="control-group">
        <Button :icon="['fas', 'times']" :label="'Cancel'" @click="model = false"></Button>
        <Button type="solid" :icon="['fas', 'check']" :label="'Confirm'" @click="confirm"></Button>
        <!-- :disabled="noTypeSelected || noValue" -->
      </div>
    </template>
  </Modal>
</template>

<style scoped>
#confirm {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

#type {
  display: flex;
  justify-content: space-around;
  gap: 0.25rem;
  user-select: none;
  margin-bottom: 1rem;

  .option {
    border: 1px solid var(--color-border);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex-basis: 0;
    flex-grow: 1;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--color-background-soft);
    transition: background-color 0.3s;

    span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
    }

    p {
      text-align: center;
      font-size: 0.8rem;
    }

    &:hover {
      background-color: var(--color-hover);
    }

    &.selected {
      background-color: var(--color-primary-mute);
    }
  }
}
</style>