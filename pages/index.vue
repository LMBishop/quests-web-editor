<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>

<template>
  <div id="welcome-container">
    <div id="welcome">
      <img id="welcome-image" src="@/assets/quests-logo.png" alt="Quests logo" />
      <b id="title">Welcome to the Quests Web Editor</b>
      <p>
        This is a work in progress build of the web editor for
        <a href="https://github.com/LMBishop/Quests">Quests</a>. It is <b>not</b> ready for use.
      </p>
      <p>
        If you would like to try this out, use the buttons in the top right corner to start a
        session.
      </p>
      <b id="subtitle">Cannot import from filesystem</b>
      <p>
        If you cannot import from filesystem, then that means you are using a browser which does not
        implement the
        <a href="https://wicg.github.io/file-system-access/">File System Access API</a>. At the time
        of writing, only Chromium based browsers (Google Chrome, Microsoft Edge, Brave, etc.)
        implement this. This means if you use Firefox or Safari, you must switch browser to use this
        feature.
      </p>
      <p>You can instead load the test data instead by clicking the "Demo" button.</p>
      <b id="subtitle">Light / dark theme</b>
      <p>
        Note that the light theme of this website is a work in progress. Please use the dark theme.
        The colour scheme will automatically adjust based on your browsers preferences.
      </p>
      <b id="subtitle">Source code</b>
      <p>
        Just like Quests itself, the source code is
        <a href="https://github.com/LMBishop/quests-web-editor">available on GitHub</a>. Due to the
        volatile state of this project, if you would like to get involved please get in touch with
        me first.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#welcome-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

#welcome {
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 800px;

  #title {
    font-weight: bold;
    font-size: 1.5rem;
  }

  #subtitle {
    font-weight: bold;
    font-size: 1.1rem;
  }

  #welcome-image {
    max-width: 8rem;
    align-self: center;
  }

  b {
    font-weight: bold;
  }
}
</style>
