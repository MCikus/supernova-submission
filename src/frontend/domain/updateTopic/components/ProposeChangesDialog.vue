<template>
  <BaseFullscreenDialog
    class="pt-24 md:pt-40"
    :class="componentName"
    :dialog-is-visible="dialogIsVisible"
    @dialogVisibilityChanged="dialogIsVisible = $event"
  >
    <template #dialogContent>
      <div
        class="flex h-full w-full max-w-3xl flex-col items-start justify-start overflow-hidden"
      >
        <div
          v-for="(step, index) in finishedSteps"
          :key="step.id"
          class="hyphens-auto line-clamp-7 w-full overflow-hidden break-words"
        >
          <div
            v-if="step.stepType === 'input'"
            class="text-2xl text-white"
            :class="index > 0 ? 'mt-12' : ''"
            @click="currentStepIndex = index"
          >
            {{ step.placeholder + ': ' + step.value }}
          </div>
        </div>
        <div
          v-if="currentStep.stepType === 'input'"
          class="flex w-full flex-nowrap"
          :class="finishedSteps.length > 0 ? 'mt-12' : ''"
        >
          <span class="mr-6 inline-flex h-10 w-1 bg-orange-600" />
          <InlineInput
            class="text-4xl text-white placeholder-white placeholder-opacity-50 hover:text-white"
            :multiline="true"
            :value="currentStep.value"
            :placeholder="currentStep.placeholder"
            :maxlength="currentStep.maxlength"
            :focus-on-mount="true"
            @inline-input-changed="inputValueHasChanged($event, currentStep)"
          />
        </div>
        <div
          v-if="currentStep.stepType === 'input'"
          class="mt-12 flex flex-nowrap items-center"
        >
          <button
            type="button"
            class="mr-4 rounded-md bg-orange-600 px-4 py-2.5 text-sm text-white"
            @click="handleButtonClick"
          >
            Next
          </button>
          <span class="cursor-default text-sm text-white">
            press
            <span class="font-bold">Enter ↵</span>
          </span>
        </div>
        <div
          v-if="currentStep.stepType === 'submit'"
          class="mt-12 flex flex-nowrap items-center"
        >
          <button
            type="button"
            class="mr-4 rounded-md bg-orange-600 px-4 py-2.5 text-sm text-white"
            @click="handleButtonClick"
          >
            Submit your changes
          </button>
          <span class="cursor-default text-sm text-white">
            press
            <span class="font-bold">Cmd ⌘ + Enter ↵</span>
          </span>
        </div>
      </div>
    </template>
  </BaseFullscreenDialog>
</template>

<script>
import { defineComponent, computed } from 'vue'
import BaseFullscreenDialog from '@/app/components/BaseFullscreenDialog.vue'
import InlineInput from '@/domain/cards/components/InlineInput.vue'
import { useProposeChangesDialogStore } from '@/domain/updateTopic/services/useProposeChangesDialogStore.js'
import { useUserStore } from '@/app/services/useUserStore.js'
import { onKeyStroke } from '@vueuse/core'
import { storeToRefs } from 'pinia'

export const componentName = 'ProposeChangesDialog'

export default defineComponent({
  name: componentName,
  components: {
    BaseFullscreenDialog,
    InlineInput,
  },
  setup() {
    const useProposeChangesDialog = useProposeChangesDialogStore()
    const { dialogIsVisible, steps, currentStepIndex } = storeToRefs(
      useProposeChangesDialog,
    )

    const proposal = computed(() => ({
      id: 'SomeProposalId',
      topicId: 'TheTopicsId',
      cardId: 'TheCardIdOfCardWithChanges',
      title: steps.value.find((step) => step.stepKey === 'title').value,
      description: steps.value.find((step) => step.stepKey === 'description').value,
      proposer: useUserStore().userName,
    }))

    const currentStep = computed({
      get() {
        return steps.value[currentStepIndex.value]
      },
      set(value) {
        steps.value[currentStepIndex.value].value = value
      },
    })

    const finishedSteps = computed(() => {
      if (currentStepIndex.value === 0) {
        return []
      }
      if (
        currentStepIndex.value === steps.value.length - 1 &&
        currentStep.value.value !== ''
      ) {
        return steps.value
      }
      return steps.value.slice(0, currentStepIndex.value)
    })

    const executeStepActions = (payload) => {
      currentStep.value.actions.forEach((action) =>
        useProposeChangesDialog[action](payload),
      )
    }

    const handleButtonClick = () => {
      executeStepActions(proposal.value)
    }

    const inputValueHasChanged = ({ event }, step) => {
      step.value = event.target.value
    }

    onKeyStroke('Enter', (e) => {
      e.preventDefault()
      if (currentStep.value.stepType === 'input') {
        executeStepActions()

      }
      if (currentStep.value.stepType === 'submit' && e.metaKey === true) {
        console.log(steps.value)  // ez object log
        executeStepActions()
      }
    })

    return {
      componentName,
      steps,
      finishedSteps,
      currentStep,
      currentStepIndex,
      inputValueHasChanged,
      handleButtonClick,
      dialogIsVisible,
    }
  },
})
</script>
