<script setup lang="ts">
defineProps<{
  option: string
  label: string
  type: string
  isOptionSetFn: (option: string) => boolean;
  removeOptionFn: (option: string) => void;
  setOptionFn: (option: string, type: any) => void;
}>()
</script>

<template>
  <div class="label-with-button">
    <label :for="'itemstack-' + option">{{ label }}</label>

    <Button v-if="isOptionSetFn(option)" label="Remove" :icon="['fas', 'minus']"
      @click="removeOptionFn(option)"></Button>
  </div>
</template>

<style scoped>
.label-with-button {
  display: flex;
  justify-content: space-between;
}
</style>