import httpClient from '@/app/services/httpClient.js'
import { openGraphMetaData } from '@/app/services/miljnApiEndpoints.js'

export const findOpenGraphData = async (url) => {
  return (await httpClient.post(openGraphMetaData.index, { url: url }))?.data?.data ?? {}
}

export default {
  findOpenGraphData,
}
