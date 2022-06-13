import { defineStore } from 'pinia'
import { find, allByIds } from '@/domain/dataManager/services/cardClient'
import { log } from '@/app/services/errorService.js'

export const useCardsStore = defineStore('useCardsStore', {
  state: () => ({
    parents: [],
    children: {},
    expandedCardId: '',
  }),
  actions: {
    async findAllParentsAndChildren(cardId) {
      try {
        const topic = await find(cardId)
        this.parents = await allByIds(topic.children)

        for (const parent of this.parents) {
          this.children[parent.id] = await allByIds(parent.children)
        }
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
