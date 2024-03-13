<script setup lang="ts">
const session = useSessionStore();

const showModal = ref(false);

const open = () => {
  showModal.value = true;
}

const { canUseFsApi } = getBrowserCapabilities();
const isUsingFsMode = computed(() => session.getSessionType() === 'filesystem');

defineExpose({
  open
})
</script>

<template>
  <Modal v-model="showModal">
    <template v-slot:header>
      <h2>Export quest configuration</h2>
    </template>

    <div id="export">
      <p>Use one of the options below to export quest configuration data.</p>

      <div id="export-options">
        <div class="row-container export-row">
          <div id="icon">
            <font-awesome-icon :icon="['fas', 'hard-drive']" />
          </div>

          <div id="description">
            <p id="subtitle">Write to File System</p>
            <p>Write directly to the Quests data directory you opened.</p>
            <p class="error" v-if="!canUseFsApi">
              <font-awesome-icon :icon="['fas', 'xmark']" />
              Your browser is not capable of using this mode.
            </p>
            <p class="error" v-if="canUseFsApi && !isUsingFsMode">
              <font-awesome-icon :icon="['fas', 'xmark']" />
              You did not start this session by importing from file system.
            </p>
          </div>

          <div id="button-group">
            <Button type="solid" label="Continue" :disabled="true" />
          </div>
        </div>
        <div class="row-container export-row">
          <div id="icon">
            <font-awesome-icon :icon="['fas', 'upload']" />
          </div>

          <div id="description">
            <p id="subtitle">Send to Server</p>
            <p>Upload your quest configuration to the server, which can be downloaded and automatically applied in-game.
            </p>
          </div>

          <div id="button-group">
            <Button type="solid" label="Continue" :disabled="true" />
          </div>
        </div>
        <div class="row-container export-row">
          <div id="icon">
            <font-awesome-icon :icon="['fas', 'file-zipper']" />
          </div>

          <div id="description">
            <p id="subtitle">Download as ZIP</p>
            <p>Download your quest configuration as a ZIP file.</p>
          </div>

          <div id="button-group">
            <Button type="solid" label="Continue" :disabled="true" />
          </div>
        </div>
      </div>
    </div>

    <div id="controls" class="control-group">
      <Button :icon="['fas', 'xmark']" :label="'Cancel'" @click="showModal = false"></Button>
    </div>
  </Modal>
</template>

<style scoped>
#export-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

#export-options {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.row-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  gap: 0.5rem;

  #icon {
    flex-basis: 3rem;
    flex-shrink: 0;
    font-size: 2rem;
    color: var(--color-text-mute);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #description {
    flex-grow: 1;
  }

  #button-group {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

.export-row {
  border-bottom: 1px solid var(--color-border-soft);
}

.export-row:first-child {
  border-top: 1px solid var(--color-border-soft);
}

.error {
  color: var(--color-false);
}

#export {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#title {
  font-weight: bold;
  font-size: 1.5rem;
}

#subtitle {
  font-weight: bold;
  font-size: 1.1rem;
}

b {
  font-weight: bold;
}

hr {
  width: 100%;
}

#controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>