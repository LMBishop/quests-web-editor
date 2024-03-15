<script setup lang="ts">
import { stringify } from 'yaml';
import { mapJsonQuestToYamlObject } from '~/lib/questsLoader';

const emit = defineEmits(['delete']);
const props = defineProps({
  questId: {
    required: true,
    type: String,
  },
});

const session = useSessionStore();

const showModal = ref(false);
const yamlString = ref('');

const open = () => {
  const quest = session.getQuestById(props.questId);
  if (!quest) {
    return;
  }
  const mappedObject = mapJsonQuestToYamlObject(quest);
  yamlString.value = stringify(mappedObject);
  showModal.value = true;
};

defineExpose({
  open,
});
</script>

<template>
  <Modal v-model="showModal">
    <template v-slot:header>
      <h2>YAML</h2>
    </template>

    <p>
      YAML file for <code>{{ props.questId }}</code>
    </p>

    <textarea rows="20" :value="yamlString" readonly />

    <div id="confirm" class="control-group">
      <Button
        type="solid"
        :icon="['fas', 'check']"
        :label="'Close'"
        @click="showModal = false"
      ></Button>
    </div>
  </Modal>
</template>

<style scoped>
#confirm {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

textarea {
  width: 100%;
}
</style>
