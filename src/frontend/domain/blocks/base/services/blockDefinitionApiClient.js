import httpClient from '@/app/services/httpClient.js'
import { blockDefinitions } from '@/app/services/miljnApiEndpoints.js'

// @todo: handle Errors

export const allBlockDefinitions = async () => {
    return (await httpClient.get(blockDefinitions.index))?.data?.data ?? []
}

export default {
    allBlockDefinitions,
}
