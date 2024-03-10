import { defineStore } from 'pinia'

export interface EditorQuest {
  id: string;
  display: {
    name: string;
    lore: {
      normal: string[];
      started: string[];
    }
    type: string;
  }
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
    }
    timeLimit: {
      enabled: boolean;
      time: number;
    }
    sortOrder: number;
    autostart: boolean;
    completedDisplay?: string;
    cooldownDisplay?: string;
    permissionDisplay?: string;
    lockedDisplay?: string;
  }
}

export interface EditorTask {
  id: string;
  config: {
    type: string;
    [key: string]: any;
  }
}

export interface EditorCategory {
  id: string;
  display: {
    name: string;
    lore: string[];
    type: string;
  }
  permissionRequired: string;
}

export interface TaskDefinition {
  description: string;
  configuration: {
    [key: string]: {
      type: string | string[];
      description: string;
      default?: any;
      required?: boolean;
      note?: string;
    }
  }
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionType: '',
    session: {
      quests: [] as EditorQuest[],
      categories: [] as EditorCategory[],
      taskDefinitions: {} as { [key: string]: TaskDefinition },
    }
  }),
  getters: {
    getSessionType(): string {
      return this.sessionType
    },
    getQuests(): EditorQuest[] {
      return this.session.quests
    },
    getCategories(): EditorCategory[] {
      return this.session.categories
    },
    getQuestById: (state) => (id: string) => {
      if (!id) return null;
      return state.session.quests.find(quest => quest.id === id)
    },
    getCategoryById: (state) => (id: string) => {
      if (!id) return null;
      return state.session.categories.find(quest => quest.id === id)
    },
    getQuestsInCategory: (state) => (id: string) => {
      if (!id) return [];
      return state.session.quests.filter(quest => quest.options.category === id)
    },
    getTaskDefinitions: (state) => {
      return state.session.taskDefinitions
    },
    getTaskDefinitionByTaskType: (state) => (type: string) => {
      return state.session.taskDefinitions[type]
    },
    getKnownTaskTypes: (state) => () => {
      return Object.keys(state.session.taskDefinitions)
    }
    // getEditorCategories: (state) => {
    //   return state.editor.categories
    // }
  },
  actions: {
    setSessionType(type: string) {
      this.sessionType = type
    },
    setQuests(quests: EditorQuest[]) {
      this.session.quests = quests
    },
    setCategories(categories: EditorCategory[]) {
      this.session.categories = categories
    },
    // updateEditorCategories() { 
    //   const categories: { [key: string]: { quests: string[] } } = {}
    //   this.session.categories.forEach(category => {
    //     categories[category.id] = { quests: [] }
    //   })
    //   this.session.quests.forEach(quest => {
    //     categories[quest.options.category].quests.push(quest.id)
    //   })
    //   this.editor.categories = categories;
    // },
    setTaskDefinitions(definitions: { [key: string]: TaskDefinition }) {
      this.session.taskDefinitions = definitions
    },
    changeQuestId(oldId: string, newId: string) {
      const quest = this.getQuestById(oldId);
      if (!quest) return;
      
      quest.id = newId
    },
    deleteQuest(id: string) {
      const index = this.session.quests.findIndex(quest => quest.id === id)
      if (index === -1) return;
      this.session.quests.splice(index, 1)
    },
    duplicateQuest(id: string, newQuestId: string) {
      const quest = this.getQuestById(id);
      if (!quest) return;

      const newQuest = JSON.parse(JSON.stringify(quest));
      newQuest.id = newQuestId;
      this.session.quests.push(newQuest);
    }
  }
});
