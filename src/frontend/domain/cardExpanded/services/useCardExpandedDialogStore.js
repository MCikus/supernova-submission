import { defineStore } from 'pinia'

export const useCardExpandedDialogStore = defineStore('useCardExpandedDialogStore', {
  state: () => ({
    dialogIsVisible: false,
    expandedCard: {},
    expandedCardSiblings: [],
    nextButtonDisabled: false,
    previousButtonDisabled: false,
  }),
  actions: {
    open(card, siblingCards) {
      this.expandedCard = card
      this.expandedCardSiblings = siblingCards

      const cardIndex = this.expandedCardSiblings.findIndex(
        (card) => card.id === this.expandedCard.id,
      )

      if (cardIndex >= this.expandedCardSiblings.length - 1) {
        this.nextButtonDisabled = true
      }
      if (cardIndex <= 0) {
        this.previousButtonDisabled = true
      }

      this.dialogIsVisible = true
    },
    close() {
      this.dialogIsVisible = false
      this.$reset()
    },
    toggle(card) {
      this.dialogIsVisible ? this.close() : this.open(card)
    },
    nextCard() {
      const nextCardIndex =
        this.expandedCardSiblings.findIndex((card) => card.id === this.expandedCard.id) +
        1
      this.previousButtonDisabled = false
      if (nextCardIndex >= this.expandedCardSiblings.length - 1) {
        this.nextButtonDisabled = true
      }
      if (nextCardIndex >= this.expandedCardSiblings.length) {
         return
       }
      this.expandedCard = this.expandedCardSiblings[nextCardIndex]
    },
    previousCard() {
      const nextCardIndex =
        this.expandedCardSiblings.findIndex((card) => card.id === this.expandedCard.id) -
        1
      this.nextButtonDisabled = false
      if (nextCardIndex <= 0) {
        this.previousButtonDisabled = true
      }
      if (nextCardIndex <= -1) {
        return
      }
      this.expandedCard = this.expandedCardSiblings[nextCardIndex]
    },
  },
})
