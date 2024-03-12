<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore();

const { session } = storeToRefs(sessionStore);

const currentType = ref('quests' as 'quests' | 'items');

const setSelectedType = (type: 'quests' | 'items') => {
  currentType.value = type;
}
</script>

<template>
  <div id="sidebar-container">
    <div id="selector">
      <span class="option" @click="setSelectedType('quests')" :class="{ selected: currentType === 'quests' }">
        <span>
          <font-awesome-icon :icon="['far', 'compass']" />
          Quests
        </span>
      </span>
      <span class="option" @click="setSelectedType('items')" :class="{ selected: currentType === 'items' }">
        <span>
          <font-awesome-icon :icon="['fas', 'cubes']" />
          Items
        </span>
      </span>
    </div>
    <div id="quests" v-if="currentType === 'quests'">
      <EditorSidebarCategory v-for="category in session.categories" :key="category.id" :category="category" />
      <EditorSidebarQuest
        v-for="quest in session.quests.filter((q) => (!session.categories.some((c) => c.id === q.options.category)))"
        :key="quest.id" :quest="quest" />
      <p id="count">{{ session.quests.length }} quest{{ session.quests.length === 1 ? '' : 's' }}, {{
        session.categories.length }}
        categor{{ session.categories.length === 1 ? 'y' : 'ies' }}</p>
    </div>
    <div id="items" v-if="currentType === 'items'">
      <EditorSidebarItem v-for="item in session.items" :key="item.id" :item="item" />
      <p id="count">{{ session.items.length }} item{{ session.items.length === 1 ? '' : 's' }}</p>
    </div>
    <div id="configuration-container">
      <EditorSidebarMainConfiguration />
    </div>
  </div>
</template>

<style scoped>
#sidebar-container {
  width: 20rem;
  border-right: 1px solid var(--color-border);
  height: calc(100vh - 73px);
  max-height: calc(100vh - 73px);
  background-color: var(--color-background);
  user-select: none;
  position: relative;
  z-index: 0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);

  #selector {
    display: flex;
    height: 30px;
    align-items: center;
    cursor: pointer;

    .option {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      transition: background-color 0.3s;

      &.selected {
        background-color: var(--color-background);

        span {
          font-weight: 700;
        }
      }

      &:not(.selected) {
        background-color: var(--color-background-mute);
        color: var(--color-text-mute);
        transition: color 0.3s;

        &:hover {
          color: var(--color-text)
        }
      }
    }
  }

  #quests {
    max-height: calc(100vh - 73px - 46px - 30px);
    overflow-y: auto;
  }

  #configuration-container {
    height: 46px;
    border-top: 1px solid var(--color-border);
    position: absolute;
    bottom: 0;
    width: 100%
  }

  #count {
    margin: 0.5rem 0;
    font-size: 0.7rem;
    text-align: center;
    color: var(--color-text-mute);
  }
}
</style>