import { defineStore } from 'pinia'

export const useCardsStore = defineStore('useCardsStore', {
  state: () => ({
    expandedCardId: '',
  }),
  actions: {
    expandCard(payload) {
      if (this.expandedCardId !== payload) {
        this.expandedCardId = payload
      }
    },
    collapseCard(payload) {
      if (this.expandedCardId === payload) {
        this.expandedCardId = payload
      }
    },
  },
})
