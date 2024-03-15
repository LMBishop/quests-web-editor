import { defineStore } from 'pinia';

export interface EditorQuest {
  id: string;
  display: {
    name: string;
    lore: {
      normal: string[];
      started: string[];
    };
    type: string;
  };
  tasks: { [key: string]: EditorTask };
  rewards: string[];
  startCommands?: string[];
  startString?: string[];
  rewardString?: string[];
  placeholders?: { [key: string]: string };
  options: {
    category: string;
    requirements: string[];
    permissionRequired: boolean;
    cancellable: boolean;
    countsTowardsLimit: boolean;
    repeatable: boolean;
    cooldown: {
      enabled: boolean;
      time: number;
    };
    timeLimit: {
      enabled: boolean;
      time: number;
    };
    sortOrder: number;
    autostart: boolean;
    completedDisplay?: string;
    cooldownDisplay?: string;
    permissionDisplay?: string;
    lockedDisplay?: string;
  };
}

export interface EditorTask {
  id: string;
  config: {
    type: string;
    [key: string]: any;
  };
}

export interface EditorCategory {
  id: string;
  display: {
    name: string;
    lore: string[];
    type: string;
  };
  permissionRequired: string;
}

export interface EditorItem {
  id: string;
  type: string;
  config: any;
}

export interface TaskDefinition {
  description: string;
  icon: {
    style: string;
    name: string;
  };
  configuration: {
    [key: string]: {
      type: string | string[];
      description: string;
      default?: any;
      required?: boolean;
      note?: string;
    };
  };
}

export interface QuestItemDefinition {
  description: string;
  selectable: boolean;
  defined: boolean;
  configuration: {
    [key: string]: {
      type: string | string[];
      description: string;
    };
  };
}

export type SessionType = 'none' | 'filesystem' | 'demo';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionType: 'none' as SessionType,
    session: {
      quests: [] as EditorQuest[],
      categories: [] as EditorCategory[],
      items: [] as EditorItem[],
      taskDefinitions: {} as { [key: string]: TaskDefinition },
      taskTypeAliases: {} as { [key: string]: string },
      questItemDefinitions: {} as { [key: string]: QuestItemDefinition },
    },
  }),
  getters: {
    getSessionType: (state) => () => {
      return state.sessionType;
    },
    getQuests: (state) => () => {
      return state.session.quests;
    },
    getCategories: (state) => () => {
      return state.session.categories;
    },
    getItems: (state) => () => {
      return state.session.items;
    },
    getQuestById: (state) => (id: string) => {
      if (!id) return null;
      return state.session.quests.find((quest) => quest.id === id);
    },
    getCategoryById: (state) => (id: string) => {
      if (!id) return null;
      return state.session.categories.find((quest) => quest.id === id);
    },
    getItemById: (state) => (id: string) => {
      if (!id) return null;
      return state.session.items.find((item) => item.id === id);
    },
    getQuestsInCategory: (state) => (id: string) => {
      if (!id) return [];
      return state.session.quests.filter((quest) => quest.options.category === id);
    },
    getTaskDefinitions: (state) => {
      return state.session.taskDefinitions;
    },
    getTaskDefinitionByTaskType: (state) => (type: string) => {
      return (
        state.session.taskDefinitions[type] ||
        state.session.taskDefinitions[state.session.taskTypeAliases[type]]
      );
    },
    getKnownTaskTypes: (state) => () => {
      return Object.keys(state.session.taskDefinitions);
    },
    getQuestItemDefintions: (state) => {
      return state.session.questItemDefinitions;
    },
    getQuestItemDefinitionByTaskType: (state) => (type: string) => {
      return state.session.questItemDefinitions[type];
    },
    getKnownQuestItemTypes: (state) => () => {
      return Object.keys(state.session.questItemDefinitions);
    },
  },
  actions: {
    setSessionType(type: SessionType) {
      this.sessionType = type;
    },
    setQuests(quests: EditorQuest[]) {
      this.session.quests = quests;
    },
    setCategories(categories: EditorCategory[]) {
      this.session.categories = categories;
    },
    setItems(items: EditorItem[]) {
      this.session.items = items;
    },
    setTaskDefinitions(definitions: { [key: string]: TaskDefinition }) {
      this.session.taskDefinitions = definitions;
    },
    setTaskTypeAliases(taskTypeAliases: { [key: string]: string }) {
      this.session.taskTypeAliases = taskTypeAliases;
    },
    setQuestItemDefinitions(definitions: { [key: string]: QuestItemDefinition }) {
      this.session.questItemDefinitions = definitions;
    },
    changeQuestId(oldId: string, newId: string) {
      const quest = this.getQuestById(oldId);
      if (!quest) return;

      quest.id = newId;
    },
    deleteQuest(id: string) {
      const index = this.session.quests.findIndex((quest) => quest.id === id);
      if (index === -1) return;
      this.session.quests.splice(index, 1);
    },
    duplicateQuest(id: string, newQuestId: string) {
      const quest = this.getQuestById(id);
      if (!quest) return;

      const newQuest = JSON.parse(JSON.stringify(quest));
      newQuest.id = newQuestId;
      this.session.quests.push(newQuest);
    },
  },
});
