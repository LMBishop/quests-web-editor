<template>
  <div id="header">
    <slot />
  </div>
</template>

<style lang="scss">
#header {
  padding: 1rem 1rem 0.5rem 1rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 55px;
  display: flex;
  align-items: left;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  z-index: 0;

  #path {
    font-size: 1.2rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .icon {
      font-size: 0.8rem;
    }

    .chevron {
      font-size: 0.8rem;
      color: var(--color-text-mute);
    }

    .title {
      font-weight: 700;
    }

    code {
      font-size: 0.8rem;
      color: var(--color-text-mute);
    }
  }
}

.none-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.2rem;
  color: var(--color-text-mute);
}
</style>
