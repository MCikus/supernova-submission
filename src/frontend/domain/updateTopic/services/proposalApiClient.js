/*import httpClient from '@/app/services/httpClient.js'
import { proposals } from '@/app/services/miljnApiEndpoints.js'*/

// @todo: handle Errors

export const all = async () => {
    const fakeProposal = {
      id: 'SomeProposalId',
      topicId: 'TheTopicsId',
      cardId: 'TheCardIdOfCardWithChanges',
      title: 'Improved and extended Javascript onboarding',
      description: 'Let’s keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn’t distract ourselves with browser-specific implementations of it.',
      proposer: 'Jon Doe'
    }
    return {
      incoming: [fakeProposal],
      outgoing: [fakeProposal]
    }
   //return (await httpClient.get(proposals.index))?.data?.data ?? {}
}

export const update = async (proposal) => {
  // eslint-disable-next-line no-console
  console.error('Updating topics is not implemented yet: ', proposal)
}

export const accept = async (proposalId) => {
  // eslint-disable-next-line no-console
  console.error('Accepting proposals is not implemented yet: ', proposalId)
}

export const reject = async (proposalId) => {
  // eslint-disable-next-line no-console
  console.error('Rejecting proposals is not implemented yet: ', proposalId)
}


export default {
  all,
  update,
  accept,
  reject
}