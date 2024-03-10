<script setup lang="ts">
import { computed } from 'vue';
import materials from '@/lib/materials';

const model = defineModel<any>();

if (typeof model.value !== 'object' || model.value === null) {
  model.value = {};
}

const itemName = computed({
  get() {
    return model.value.name;
  },
  set(newValue: string) {
    model.value.name = newValue;
  },
});

const itemType = computed({
  get() {
    return model.value.type || model.value.material || model.value.item;
  },
  set(newValue: string) {
    if (model.value.material) {
      model.value.material = newValue;
    } else if (model.value.item) {
      model.value.item = newValue;
    } else {
      model.value.type = newValue;
    }
  },
});
</script>

<template>
  <div class="option-group">
    <label for="itemstack-name">Name</label>
    <input id="itemstack-name" name="itemstack-name" v-model="itemName" placeholder="Enter a display name" />
  </div>

  <div class="option-group">
    <label for="itemstack-name">Type</label>
    <multiselect v-model="itemType" 
      :options="materials" :searchable="true" placeholder="Choose a material" />
  </div>
</template>

<style scoped>
</style>