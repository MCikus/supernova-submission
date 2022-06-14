import { defineStore } from 'pinia'
import { find, allByIds, update } from '@/domain/dataManager/services/cardClient'
import { useTopicsStore } from "@/app/services/useTopicsStore.js"
import { storeToRefs } from 'pinia'
import { log } from '@/app/services/errorService.js'

export const useCardsStore = defineStore('useCardsStore', {
  state: () => ({
    parents: [],
    children: {},
    expandedCardId: '',
  }),
  actions: {
    async findAllParentsAndChildren(titleCardId) {
      try {
        const topic = await find(titleCardId)
        this.parents = await allByIds(topic.children)

        for (const parent of this.parents) {
          this.children[parent.id] = await allByIds(parent.children)
        }
      } catch (e) {
        log(e)
      }
    },
    async updateParentsCardOrder(titleCardId, parents) {
      const { topics } = storeToRefs(useTopicsStore())
      this.parents = [...parents]

      const parentIds = this.parents.map(parent => parent.id)
      const topic = topics.value.find(topic => topic.id === titleCardId)
      topic.children = [...parentIds]

      try {
        await update(topic)
      } catch(e) {
        log(e)
      }
    },
    async updateChildrenCardOrder(parentCardId, children) {
      this.children[parentCardId] = [...children]

      const childrenIds = children.map(child => child.id)
      const parent = this.parents.find(parent => parent.id === parentCardId)
      parent.children = [...childrenIds]

      try {
        await update(parent)
      } catch(e) {
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
