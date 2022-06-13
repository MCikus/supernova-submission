/*import httpClient from '@/app/services/httpClient.js'
import { cards } from '@/app/services/miljnApiEndpoints.js'*/
import {v4 as uuid} from 'uuid'
// @todo: handle Errors

export const allCards = async (titleCardId) => {
  const parents = [{id: uuid()},{id: uuid()}]
  const children = {}
  children[`${parents[0].id}`] = {
    id: uuid()
  }
  children[`${parents[1].id}`] = {
    id: uuid()
  }

  return {
    parents,
    children
  }
  // return (await httpClient.get(cards.index(titleCardId)))?.data?.data ?? {}
}

export const updateCard = async (card) => {
  // eslint-disable-next-line no-console
  console.error('Updating card is not implemented yet: ', card)
  // return (await httpClient.put(cards.modify(card.id), JSON.stringify(card)))?.data?.data ?? []
}

export default {
  allCards,
  updateCard,
}
