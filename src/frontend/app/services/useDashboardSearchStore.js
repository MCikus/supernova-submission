import { defineStore } from 'pinia'

export const useDashboardSearchStore = defineStore('useDashboardSearch', {
  state: () => ({
    topicsSearchString: null,
  }),
})
