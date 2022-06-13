import { defineStore } from 'pinia'
import { useProposalsStore } from '@/domain/updateTopic/services/useProposalsStore.js'

export const useAcceptChangesDialogStore = defineStore('useAcceptChangesDialogStore', {
  state: () => ({
    dialogIsVisible: false,
    proposal: null,
  }),
  actions: {
    open(proposalId) {
      this.proposal = useProposalsStore().incoming.find(
        (proposal) => proposal.id === proposalId,
      )
      this.dialogIsVisible = true
    },
    close() {
      this.dialogIsVisible = false
      this.proposal = null
    },
    toggle(proposalId) {
      this.dialogIsVisible ? this.open(proposalId) : this.close()
    },
  },
})
