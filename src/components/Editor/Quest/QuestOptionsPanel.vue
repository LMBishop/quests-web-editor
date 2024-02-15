<script setup lang="ts">
import { useSessionStore, type EditorQuest } from '@/stores/session';
import { computed } from 'vue';
import EditorOptionsPanel from '@/components/Editor/EditorOptionsPanel.vue';
import Checkbox from '@/components/Control/Checkbox.vue';

const props = defineProps<{
  questId: string;
}>();

const sessionStore = useSessionStore();

const quest = computed(() => {
  return sessionStore.getQuestById(props.questId) as EditorQuest;
});
const knownCategories = computed(() => {
  return sessionStore.session.categories.map((category) => category.id);
});
const knownQuests = computed(() => {
  return sessionStore.session.quests.map((quest) => quest.id);
});
</script>

<template>
  <EditorOptionsPanel v-if="quest">
    <div id="options">
      <div class="option-group">
        <label for="quest-category">Category</label>
        <multiselect
          id="quest-category"
          v-model="quest.options.category"
          :options="knownCategories"
          :searchable="true"
          placeholder="No category"></multiselect>
      </div>

      <div class="option-group">
        <label for="quest-requirements">Requirements</label>
        <multiselect
          id="quest-requirements"
          v-model="quest.options.requirements"
          :options="knownQuests"
          :searchable="true"
          :taggable="true"
          :multiple="true"
          placeholder="Add requirement"></multiselect>
        <p class="description">
          This quest will only be available if the player has completed all of the quests listed above.
        </p>
      </div>

      <h2>Quest options</h2>

      <div class="option-group">
        <Checkbox id="quest-permissionrequired" label="Require permission to start quest"
          description="Players must have permission to start the quest." v-model="quest.options.permissionRequired" />
      </div>

      <div class="option-group">
        <Checkbox id="quest-cancellable" label="Allow players to cancel quest"
          description="Players can cancel the quest after they have started it." v-model="quest.options.cancellable" />
      </div>

      <div class="option-group">
        <Checkbox id="quest-countstowardslimit" label="Count towards quest limit"
          description="Quest will count towards the player's quest started limit."
          v-model="quest.options.countsTowardsLimit" />
      </div>

      <div class="option-group">
        <Checkbox id="quest-repeatable" label="Allow players to repeat quest"
          description="Quest can be completed again after it has been completed once."
          v-model="quest.options.repeatable" />
      </div>

      <div class="option-group">
        <Checkbox id="quest-autostart" label="Automatically start quest"
          description="Quest will start automatically when the player has unlocked it."
          v-model="quest.options.autostart" />
      </div>


      <h2>Cooldown</h2>

      <div class="option-group">
        <Checkbox id="quest-cooldown" label="Enable cooldown"
          description="Players will have to wait a certain amount of time before they can start the quest again."
          v-model="quest.options.cooldown.enabled" />
      </div>

      <div class="option-group">
        <label for="quest-cooldown-time">
          Cooldown (in seconds)
        </label>
        <input id="quest-cooldown-time" type="number" v-model="quest.options.cooldown.time"
          :disabled="!quest.options.cooldown.enabled" />
        <p class="description">
          Common values are: <code>3600</code> (1 hour), <code>86400</code> (24 hours), <code>604800</code> (7 days),
          <code>2592000</code> (30 days)
        </p>
      </div>

      <h2>Time limit</h2>

      <div class="option-group">
        <Checkbox id="quest-timelimit" label="Enable time limit"
          description="Players will be required to complete the quest within a certain amount of time, otherwise it will be automatically cancelled."
          v-model="quest.options.timeLimit.enabled" />
      </div>

      <div class="option-group">
        <label for="quest-timelimit-time">
          Time limit (in seconds)
        </label>
        <input id="quest-timelimit-time" type="number" v-model="quest.options.timeLimit.time"
          :disabled="!quest.options.timeLimit.enabled" />
        <p class="description">
          Common values are: <code>3600</code> (1 hour), <code>86400</code> (24 hours), <code>604800</code> (7 days),
          <code>2592000</code> (30 days)
        </p>
      </div>
    </div>
  </EditorOptionsPanel>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css" />

<style>
#options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description {
  font-size: 0.8em;
}

label {
  font-weight: 700;
}

h2 {
  border-bottom: 1px solid var(--color-border);
}

</style>

