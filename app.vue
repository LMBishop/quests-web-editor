<script setup lang="ts">
import '~/assets/main.css';

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://rsms.me/',
    },
    {
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css',
      crossorigin: '',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
});

useSeoMeta({
  title: 'Quests Web Editor',
  ogTitle: 'Quests Web Editor',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped></style>
