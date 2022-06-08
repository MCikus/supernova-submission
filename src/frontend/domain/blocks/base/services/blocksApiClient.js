import httpClient from '@/app/services/httpClient.js'
import { blocks, blocksOrder } from '@/app/services/miljnApiEndpoints.js'

export const cardBlocks = async (cardId) => {
    const cardBlocks =
        (
            await httpClient.get(blocks.index, {
                params: {
                    'filter[cardId]': cardId,
                },
            })
        )?.data?.data ?? []

    return cardBlocks.map((block) => {
        return {
            uuid: block.id,
            ...block.attributes,
        }
    })
}

export const updateBlockOrder = async (cardId, blockOrder) => {
    await httpClient.put(
        blocksOrder.modify(cardId),
        JSON.stringify({
            data: blockOrder,
        })
    )
}
export const createOrUpdateBlock = async (block) => {
    const mapBlock = (block) => {
        return {
            data: {
                id: block.uuid,
                type: 'blocks',
                attributes: {
                    typeId: block.typeId,
                    cardId: block.cardId,
                    payload: block.payload,
                },
            },
        }
    }

    return (
        (await httpClient.put(blocks.modify(block.uuid), JSON.stringify(mapBlock(block))))
            ?.data?.data ?? {}
    )
}

export const deleteBlock = async (blockId) => {
    return await httpClient.delete(blocks.modify(blockId))
}

export default {
    cardBlocks,
    createOrUpdateBlock,
    deleteBlock,
    updateBlockOrder,
}
