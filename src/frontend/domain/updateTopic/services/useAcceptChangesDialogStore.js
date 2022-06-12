import { defineStore } from 'pinia'

export const useAcceptChangesDialogStore = defineStore('useAcceptChangesDialogStore', {
  state: () => ({
    dialogIsVisible: false,
  }),
  actions: {
    open() {
      this.dialogIsVisible = true
    },
    close() {
      this.dialogIsVisible = false
    },
    toggle() {
      this.dialogIsVisible = !this.dialogIsVisible
    },
  },
})
