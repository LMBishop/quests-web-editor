<script setup land="ts">
const navigateHome = () => {
  navigateTo('/');
}
</script>

<template>
  <header>
    <div id="nav">
      <span id="logo" @click="navigateHome">
        <img src="@/assets/quests-logo.png" alt="Quests logo" />
        <h1>Quests Web Editor</h1>
      </span>
      <code>Preview</code>
    </div>

    <div id="controls">
      <LoaderImportButton />
    </div>
  </header>
</template>

<style lang="scss" scoped>
#nav {
  padding: 1rem 1rem 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-height: 72px;
  gap: 1rem;
  color: var(--color-header-text);

  img {
    max-width: 3rem;
    height: auto;
  }

  h1 {
    font-size: 1.5rem;
    margin: -5px 0 0 0;
    font-weight: 700;
  }

  code {
    font-size: 0.8rem;
    color: var(--color-header-text-mute);
  }

}

#logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  color: var(--color-header-text);
}

#controls {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

header {
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-header);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
</style>