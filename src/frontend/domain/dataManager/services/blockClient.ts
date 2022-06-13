import { data_manager } from 'canisters/data_manager'

export const find = async (blockId: string) => {
  const blockList = await data_manager.block_lookup(blockId)

  if (blockList.length === 0) {
    return null
  }

  const block = blockList[0]

  return {
    id: block.id,
    typeId: block.typeId,
    payload: JSON.parse(block.payload),
  }
}

export const allByIds = async (blocksids: Array<string>) => {
  const blockList = await data_manager.block_lookup_bulk(blocksids)

  return blockList.map((block) => {
    return {
      id: block.id,
      typeId: block.typeId,
      payload: JSON.parse(block.payload),
    }
  })
}

type Payload = object

type Block = {
  id: string
  typeId: string
  payload: Payload
}

/**
 * @param Object card
 * @param String card.id
 * @param String card.title
 * @param Object card.meta
 * @param Array<String> card.children
 * @param Array<String> card.blocks
 */
export const create = async (block: Block) => {
  await data_manager.block_insert(block.id, {
    id: block.id,
    typeId: block.typeId,
    payload: JSON.stringify(block.payload),
  })
}

/**
 * @param Object card
 * @param String card.cardId
 * @param String card.title
 * @param Object card.meta
 * @param Array<String> card.children
 * @param Array<String> card.blocks
 */
export const update = (block: Block) => {
  return create(block)
}

export const remove = async (blockId: string) => {
  await data_manager.block_delete(blockId)
}

export const all = () => {
  throw new Error('all method is not implemented')
}
