<script setup lang="ts">
import LoaderDiscardSessionModal from '~/components/loader/LoaderDiscardSessionModal.vue';

definePageMeta({
  layout: 'default',
});

const session = useSessionStore();

const { canUseFsApi } = getBrowserCapabilities();
const sessionType = computed(() => session.getSessionType());

const discardSessionModal = ref<InstanceType<typeof LoaderDiscardSessionModal> | null>(null);
</script>

<template>
  <div id="import-container">
    <div id="import">
      <b id="title">Import quest data</b>
      <p>Use one of the options below to load quest configuration data.</p>
      <div id="import-options">
        <div class="row-container import-row">
          <div id="description">
            <p id="subtitle">Load from File System</p>
            <p>Select the Quests plugin data directory to load data from.</p>
            <p class="error" v-if="!canUseFsApi">
              <font-awesome-icon :icon="['fas', 'xmark']" />
              Your browser is not capable of using this mode.
            </p>
          </div>

          <div id="button-group">
            <LoaderFileSystemButton />
          </div>
        </div>
        <div class="row-container import-row">
          <div id="description">
            <p id="subtitle">Retrieve from In-Game</p>
            <p>Download quest data uploaded from in-game.</p>
            <p class="error">
              <font-awesome-icon :icon="['fas', 'xmark']" />
              Not yet implemented.
            </p>
          </div>

          <div id="button-group">
            <LoaderNetworkButton />
          </div>
        </div>
        <div class="row-container import-row">
          <div id="description">
            <p id="subtitle">Load Test Data</p>
            <p>Get familiar with the Quests Web Editor by using test data.</p>
          </div>

          <div id="button-group">
            <LoaderTestDataButton />
          </div>
        </div>
        <div class="row-container" v-if="sessionType !== 'none'">
          <div id="description">
            <p>You are currently in a session.</p>
            <p>Session type: {{ sessionType }}</p>
          </div>

          <div id="button-group">
            <Button
              :icon="['fas', 'arrow-left']"
              label="Return to Session"
              @click="navigateToEditorPane(null)"
            />
            <Button
              accent="danger"
              :icon="['fas', 'trash']"
              label="Discard"
              @click="discardSessionModal?.open"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <LoaderDiscardSessionModal ref="discardSessionModal" />
</template>

<style lang="scss" scoped>
#import-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

#import-options {
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

  #button-group {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

.import-row {
  border-bottom: 1px solid var(--color-border-soft);
}

.import-row:first-child {
  border-top: 1px solid var(--color-border-soft);
}

.error {
  color: var(--color-false);
}

#import {
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 600px;
  width: 100%;

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
}

hr {
  width: 100%;
}
</style>
