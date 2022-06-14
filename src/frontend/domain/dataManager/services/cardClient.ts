import { data_manager } from 'canisters/data_manager'

type CardMeta = object

type Card = {
  id: string
  title: string
  meta: CardMeta
  blocks: Array<string>
  children: Array<string>
}

export const find = async (cardId: string) => {
  const cardList = await data_manager.card_lookup(cardId)

  if (cardList.length === 0) {
    return null
  }

  const card = cardList[0]

  return {
    id: card.id,
    title: card.title,
    meta: JSON.parse(card.meta),
    blocks: card.block_ids,
    children: card.children_card_ids,
  }
}

export const allByIds = async (cardsids: Array<string>) => {
  const cardList = await data_manager.card_lookup_bulk(cardsids)

  return cardList.map((card) => {
    return {
      id: card.id,
      title: card.title,
      meta: JSON.parse(card.meta),
      blocks: card.block_ids,
      children: card.children_card_ids,
    }
  })
}

/**
 * @param Object card
 * @param String card.id
 * @param String card.title
 * @param Object card.meta
 * @param Array<String> card.children
 * @param Array<String> card.blocks
 */
export const create = async (card: Card) => {
  await data_manager.card_insert(card.id, {
    id: card.id,
    title: card.title,
    meta: JSON.stringify(card.meta),
    block_ids: card.blocks,
    children_card_ids: card.children,
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
export const update = (card: Card) => {
  return create(card)
}

export const remove = async (cardId: string) => {
  await data_manager.card_delete(cardId)
}

export const all = () => {
  throw new Error('all method is not implemented')
}
