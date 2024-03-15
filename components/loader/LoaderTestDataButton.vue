<script setup lang="ts">
import type LoaderTestDataModal from './LoaderTestDataModal.vue';

const testDataModal = ref<InstanceType<typeof LoaderTestDataModal> | null>(null);

const openTestDataModal = async () => {
  testDataModal.value?.open();
};
</script>

<template>
  <ClientOnly>
    <Button type="solid" :icon="['fas', 'flask-vial']" label="Demo" @click="openTestDataModal" />

    <LoaderTestDataModal ref="testDataModal" />
  </ClientOnly>
</template>
