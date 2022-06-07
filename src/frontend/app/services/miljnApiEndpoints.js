export const apiPrefix = '/api'

export const blockDefinitionsBasename = 'block_definitions'
export const blockDefinitions = {
    index: `${apiPrefix}/${blockDefinitionsBasename}`,
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
