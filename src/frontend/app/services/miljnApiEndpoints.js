export const apiPrefix = '/api'

export const blockDefinitionsBasename = 'block_definitions'
export const blockDefinitions = {
  index: `${apiPrefix}/${blockDefinitionsBasename}`,
}

export const topicsBasename = 'topics'
export const topics = {
  index: `${apiPrefix}/${topicsBasename}`,
  modify(topicId) {
    return `${apiPrefix}/${topicsBasename}/${topicId}`
  },
}

export const cardsBasename = 'cards'
export const cards = {
  index(cardId){
    return `${apiPrefix}/${cardsBasename}/${cardId}`
  },
  modify(cardId) {
    return `${apiPrefix}/${cardsBasename}/${cardId}`
  },
}

export const blocksBasename = 'blocks'
export const blocks = {
  index: `${apiPrefix}/${blocksBasename}`,
  modify(blockId) {
    return `${apiPrefix}/${blocksBasename}/${blockId}`
  },
}

export const blocksOrderBasename = 'block_order'
export const blocksOrder = {
  index: `${apiPrefix}/${blocksOrderBasename}`,
  modify(cardId) {
    return `${apiPrefix}/${blocksOrderBasename}/${cardId}`
  },
}

export const openGraphMetaDataBasename = 'open-graph-proxy'
export const openGraphMetaData = {
  index: `${apiPrefix}/${openGraphMetaDataBasename}`,
}

export const notificationsBasename = 'notifications'
export const notifications = {
  index: `${apiPrefix}/${notificationsBasename}`,
}

export const proposalsBasename = 'notifications'
export const proposals = {
  index: `${apiPrefix}/${proposalsBasename}`,
}
