import { defineStore } from 'pinia'
import {
  all,
  propose,
  accept,
  reject,
} from '@/domain/updateTopic/services/proposalApiClient.js'
import { log } from '@/app/services/errorService.js'

export const useProposalsStore = defineStore('useProposalsStore', {
  state: () => ({
    incoming: [],
    outgoing: [],
  }),
  actions: {
    async submitProposal(proposal) {
      this.outgoing.push(proposal)

      try {
        await propose(proposal)
      } catch (e) {
        log(e)
      }
    },
    async findAllProposals() {
      try {
        const proposals = await all()
        this.incoming = proposals.incoming
        this.outgoing = proposals.outgoing
      } catch (e) {
        log(e)
      }
    },
    async acceptProposal(proposalId) {
      const proposalIndex = this.incoming.findIndex(
        (proposal) => proposal.id === proposalId,
      )
      this.incoming.splice(proposalIndex, 1)

      try {
        await accept(proposalId)
      } catch (e) {
        log(e)
      }
    },
    async rejectProposal(proposalId) {
      const proposalIndex = this.incoming.findIndex(
        (proposal) => proposal.id === proposalId,
      )
      this.incoming.splice(proposalIndex, 1)

      try {
        await reject(proposalId)
      } catch (e) {
        log(e)
      }
    },
  },
})
