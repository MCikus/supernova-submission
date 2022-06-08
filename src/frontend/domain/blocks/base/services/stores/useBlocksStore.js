import { defineStore, storeToRefs } from 'pinia'
import { useBlockDefinitionsStore } from '@/domain/blocks/base/services/stores/useBlockDefinitionsStore.js'
import {
    createOrUpdateBlock,
    deleteBlock,
    cardBlocks,
    updateBlockOrder,
} from '@/domain/blocks/base/services/blocksApiClient.js'
import { v4 as uuidv4 } from 'uuid'
import { log } from '@/app/services/errorService.js'

export const useBlocksStore = defineStore('blocksStore', {
    state: () => ({
        completeCardBlocks: [],
    }),
    actions: {
        async fetchAllBlocks() {},
        async completeBlocksForCard(cardId) {
            const { blockDefinitions } = storeToRefs(useBlockDefinitionsStore())

            try {
                this.completeCardBlocks = (await cardBlocks(cardId)).map((blockData) => {
                    return {
                        ...blockData,
                        definition: {
                            ...blockDefinitions.value.find(
                                (definition) => definition.typeId === blockData.typeId
                            ),
                        },
                    }
                })
            } catch (error) {
                // @todo: handle errors properly instead logging them #1180
                log(error)
            }
        },
        addBlockToList(typeId, cardId) {
            const { blockDefinitions } = storeToRefs(useBlockDefinitionsStore())

            // @todo: use only camel case for typeId and cardId
            const blockToAdd = {
                uuid: uuidv4(),
                typeId: typeId,
                cardId: cardId,
                payload: {},
                definition: {
                    ...blockDefinitions.value.find(
                        (definition) => definition.typeId === typeId
                    ),
                },
            }
            this.completeCardBlocks.push(blockToAdd)
        },
        async reorderBlockList(blockList) {
            this.completeCardBlocks = blockList
            if (blockList.length > 0) {
                updateBlockOrder(
                    blockList[0].cardId,
                    blockList.map((block) => block.uuid)
                )
            }
        },
        async removeBlockFromList(blockId) {
            this.completeCardBlocks = this.completeCardBlocks.filter(
                (block) => block.uuid !== blockId
            )
            try {
                await deleteBlock(blockId)
            } catch (error) {
                // @todo: handle errors properly instead logging them #1180
                log(error)
            }
        },
        async updateBlock(blockId, payload) {
            const blockIndex = this.completeCardBlocks.findIndex(
                (block) => block.uuid === blockId
            )

            this.completeCardBlocks[blockIndex] = {
                ...this.completeCardBlocks[blockIndex],
                ...payload,
            }

            try {
                const result = await createOrUpdateBlock({
                    ...this.completeCardBlocks[blockIndex],
                })
                this.completeCardBlocks[blockIndex] = {
                    ...this.completeCardBlocks[blockIndex],
                    ...result,
                }
            } catch (error) {
                // @todo: handle errors properly instead logging them #1180
                log(error)
            }
        },
    },
})
