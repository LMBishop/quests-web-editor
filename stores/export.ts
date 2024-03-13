import { defineStore } from 'pinia'

export type ZipLoaderStatus = 'inactive' | 'preparing' | 'compressing' | 'ready' | 'failed';

export const useExportStore = defineStore('export', {
  state: () => ({
    zip: {
      status: 'inactive' as ZipLoaderStatus,
      contents: null as Blob | null,
    }
  }),
  getters: {
    getZipStatus: (state) => () => {
      return state.zip.status;
    },
    getZipContents: (state) => () => {
      return state.zip.contents;
    },
  },
  actions: {
    setZipStatus(status: ZipLoaderStatus) {
      this.zip.status = status;
      if (status === 'inactive' || status === 'preparing') {
        this.zip.contents = null;
      }
    },
    setZipContents(contents: Blob) {
      this.zip.contents = contents;
    },
  }
});
