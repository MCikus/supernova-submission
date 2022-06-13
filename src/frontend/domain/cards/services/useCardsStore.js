import { defineStore } from 'pinia'
import { allCards, updateCard } from "@/domain/cards/services/cardsApiClient.js"
import { log } from '@/app/services/errorService.js'

export const useCardsStore = defineStore('useCardsStore', {
  state: () => ({
    parents: [],
    children: [],
    expandedCardId: '',
  }),
  actions: {
    async findAllParentsAndChildren(titleCardId) {
      try {
        const cards = await allCards(titleCardId)
        this.parents = cards.parents
        this.children = cards.children
      } catch (e) {
        log(e)
      }
    },
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
