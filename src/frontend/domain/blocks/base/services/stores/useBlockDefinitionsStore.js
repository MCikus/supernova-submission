import { defineStore } from 'pinia'
import { allBlockDefinitions } from '@/domain/blocks/base/services/blockDefinitionApiClient.js'
import { log } from '@/app/services/errorService.js'

export const useBlockDefinitionsStore = defineStore('blockDefinitionsStore', {
  state: () => ({
    blockDefinitions: [],
  }),
  actions: {
    async fetchAllBlockDefinitions() {
      try {
        this.blockDefinitions = [...(await allBlockDefinitions())]
      } catch (error) {
        // @todo: handle errors properly instead logging them #1180
        log(error)
      }
    },
  },
})
