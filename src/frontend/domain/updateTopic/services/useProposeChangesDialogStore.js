import { defineStore } from 'pinia'
import { useProposalsStore } from '@/domain/updateTopic/services/useProposalsStore.js'
import { v4 as uuid } from 'uuid'

export const useProposeChangesDialogStore = defineStore('useProposeChangesDialogStore', {
  state: () => ({
    dialogIsVisible: true,
    steps: [
      {
        id: uuid(),
        stepType: 'input',
        stepKey: 'title',
        placeholder: 'Name your changes',
        value: '',
        maxlength: 144,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        stepType: 'input',
        stepKey: 'description',
        placeholder: 'Describe your changes',
        value: '',
        maxlength: 400,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        stepType: 'submit',
        actions: ['submitProposal', 'close'],
      },
    ],
    currentStepIndex: 0,
    stepIndexHistory: [],
  }),
  actions: {
    open() {
      this.dialogIsVisible = true
    },
    close() {
      this.dialogIsVisible = false
      this.$reset()
    },
    toggle() {
      this.dialogIsVisible ? this.open() : this.close()
    },
    incrementStep() {
      const stepsWithoutSubmitStep = this.steps.slice(0, this.steps.length - 1)
      const eachStepHasAValue =
        stepsWithoutSubmitStep.findIndex((step) => step.value === '') === -1

      if (eachStepHasAValue) {
        this.goToLastStep()
        return
      }

      if (
        this.currentStepIndex + 1 < this.steps.length &&
        this.steps[this.currentStepIndex].value !== ''
      ) {
        this.stepIndexHistory.push(this.currentStepIndex)
        this.currentStepIndex += 1
      }
    },
    goToLastStep() {
      this.currentStepIndex = this.steps.length - 1
    },
    submitProposal(proposal) {
      useProposalsStore().submitProposal(proposal)
    },
  },
})
