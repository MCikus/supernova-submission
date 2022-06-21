import { defineStore } from 'pinia'
import { useProposalsStore } from '@/domain/updateTopic/services/useProposalsStore.js'
import { v4 as uuid } from 'uuid'

export const useProposeChangesDialogStore = defineStore('useProposeChangesDialogStore', {
  state: () => ({
    dialogIsVisible: true,
    steps: [
      {
        id: uuid(),
        miljnKey: 'name',
        stepType: 'input',
        stepKey: 'title',
        placeholder: 'Name',
        value: '',
        maxlength: 144,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        miljnKey: 'description',
        stepType: 'input',
        stepKey: 'description',
        placeholder: 'Mail',
        value: '',
        maxlength: 400,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        miljnKey: 'url',
        stepType: 'input',
        stepKey: 'description',
        placeholder: 'Project Website URL',
        value: '',
        maxlength: 400,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        miljnKey: 'team',
        stepType: 'input',
        stepKey: 'description',
        placeholder: 'Marketing Team Size',
        value: '',
        maxlength: 400,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        stepType: 'input',
        miljnKey: 'target',
        stepKey: 'description',
        placeholder: 'Target audience',
        value: '',
        maxlength: 400,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        miljnKey: 'location',
        stepType: 'input',
        stepKey: 'description',
        placeholder: 'Target audience is located in',
        value: '',
        maxlength: 400,
        actions: ['incrementStep'],
      },
      {
        id: uuid(),
        miljnKey: 'goal',
        stepType: 'input',
        stepKey: 'description',
        placeholder: 'Marketing goal',
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
