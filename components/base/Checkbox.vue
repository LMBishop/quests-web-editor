<script setup lang="ts">
const model = defineModel();

defineProps({
  id: String,
  label: String,
  description: String,
});
</script>

<template>
  <div class="checkbox">
    <label id="wrapper" :for="id">
      <input :id="id" type="checkbox" v-model="model" />
      <span id="label">{{ label }}</span>
      <span id="description">{{ description }}</span>
    </label>
  </div>
</template>

<style scoped>
#label {
  display: block;
  font-weight: bold;
}

#description {
  display: block;
  font-size: 0.8em;
}

input {
  float: left;
  margin: 5px 0 0 -20px;
}

.checkbox {
  padding: 0 0 0 20px;
}
</style>
