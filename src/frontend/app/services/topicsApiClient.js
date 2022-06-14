/*import httpClient from '@/app/services/httpClient.js'
import { topics } from '@/app/services/miljnApiEndpoints.js'*/
import { v4 as uuid } from 'uuid'
// @todo: handle Errors

export const allTopics = async () => {
  const topics = [{ id: uuid() }, { id: uuid() }]

  return {
    topics,
  }
  // return (await httpClient.get(topics.index))?.data?.data ?? []
}

export const updateTopic = async (topic) => {
  // eslint-disable-next-line no-console
  console.error('Updating topic is not implemented yet: ', topic)
  // return (await httpClient.put(topics.modify(topic.id), JSON.stringify(topic)))?.data?.data ?? []
}

export default {
  allTopics,
  updateTopic,
}
