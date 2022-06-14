import { defineStore, storeToRefs } from 'pinia'
import { useBlockDefinitionsStore } from '@/domain/blocks/base/services/stores/useBlockDefinitionsStore.js'
import { allByIds, create, update, remove } from "@/domain/dataManager/services/blockClient"
import { v4 as uuidv4 } from 'uuid'
import { log } from '@/app/services/errorService.js'

export const useBlocksStore = defineStore('blocksStore', {
  state: () => ({
    blocks: [],
  }),
  actions: {
    async findAllBlocks(card) {
      const { blockDefinitions } = storeToRefs(useBlockDefinitionsStore())

      try {
        this.blocks = (await allByIds(card.blocks)).map((blockData) => {
          return {
            ...blockData,
            definition: {
              ...blockDefinitions.value.find(
                (definition) => definition.typeId === blockData.typeId,
              ),
            },
          }
        })
      } catch (error) {
        // @todo: handle errors properly instead logging them #1180
        log(error)
      }
    },
    addBlock(typeId, cardId) {
      const { blockDefinitions } = storeToRefs(useBlockDefinitionsStore())

      const blockToAdd = {
        id: uuidv4(),
        typeId: typeId,
        payload: {},
        definition: {
          ...blockDefinitions.value.find((definition) => definition.typeId === typeId),
        },
      }
      this.blocks.push(blockToAdd)
    },
    async reorderBlocks(blockList) {
      this.blocks = blockList

    },
    async removeBlock(block) {
      this.blocks = this.blocks.filter(
        (block) => block.id !== block.id,
      )

      try {
        await remove(block)
      } catch (error) {
        // @todo: handle errors properly instead logging them #1180
        log(error)
      }
    },
    async updateBlock(blockId, payload) {
      const blockIndex = this.blocks.findIndex(
        (block) => block.id === blockId,
      )

      this.blocks[blockIndex] = {
        ...this.blocks[blockIndex],
        ...payload,
      }

      try {
        await update(this.blocks[blockIndex])
      } catch (error) {
        // @todo: handle errors properly instead logging them #1180
        log(error)
      }
    },
  },
})
