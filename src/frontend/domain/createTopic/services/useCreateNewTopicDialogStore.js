import { defineStore } from 'pinia'

export const useCreateNewTopicDialogStore = defineStore('useCreateNewTopicDialogStore', {
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
