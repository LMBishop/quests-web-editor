import { defineStore } from 'pinia'
import type { EditorCategory, EditorItem } from './session';

export type FileSystemLoaderStatus = 'inactive' | 'pending' | 'loaded' | 'invalid' | 'valid';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    fileSystem: {
      status: 'inactive' as FileSystemLoaderStatus,
      path: '' as string,
      quests: [] as EditorQuest[],
      categories: [] as EditorCategory[],
      items: [] as EditorItem[],
    }
  }),
  getters: {
    getFileSystemLoaderStatus: (state) => () => {
      return state.fileSystem.status;
    },
    getPath: (state) => () => {
      return state.fileSystem.path;
    },
    getQuests: (state) => () => {
      return state.fileSystem.quests;
    },
    getCategories: (state) => () => {
      return state.fileSystem.categories;
    },
    getItems: (state) => () => {
      return state.fileSystem.items;
    },
  },
  actions: {
    setFileSystemLoaderStatus(status: FileSystemLoaderStatus) {
      this.fileSystem.status = status;
      if (status === 'inactive' || status === 'pending') {
        this.fileSystem.quests = [];
        this.fileSystem.categories = [];
        this.fileSystem.items = [];
      }
    },
    setPath(path: string) {
      this.fileSystem.path = path;
    },
    setQuests(quests: EditorQuest[]) {
      this.fileSystem.quests = quests;
    },
    setCategories(categories: EditorCategory[]) {
      this.fileSystem.categories = categories;
    },
    setItems(items: EditorItem[]) {
      this.fileSystem.items = items;
    }
  }
});
