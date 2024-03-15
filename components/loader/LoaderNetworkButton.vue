<script setup lang="ts"></script>

<template>
  <ClientOnly>
    <Button type="solid" :icon="['fas', 'download']" label="Download" :disabled="true" />
  </ClientOnly>
</template>
