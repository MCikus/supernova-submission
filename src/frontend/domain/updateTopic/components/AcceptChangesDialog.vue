<template>
  <BaseFullscreenDialog
    class="pt-12 pb-4 md:pt-40"
    :class="componentName"
    :dialog-is-visible="dialogIsVisible"
    @dialogVisibilityChanged="dialogIsVisible = $event"
  >
    <template #dialogContent>
      <div class="flex h-full w-full max-w-3xl flex-col">
        <div class="h-fit w-full max-w-3xl overflow-hidden overflow-y-scroll">
          <h1 class="text-4xl text-white">{{ proposal?.title }}</h1>
          <p class="mt-6 text-4xl text-white md:mt-12">{{ proposal?.description }}</p>
          <span class="mt-4 block text-sm text-white md:mt-8">
            Submitted by {{ proposal?.proposer }}
          </span>
        </div>
        <div
          class="mt-4 flex flex-col flex-nowrap items-center space-y-4 md:mt-12 md:flex-row md:space-y-0"
        >
          <button
            type="button"
            class="flex w-full flex-nowrap justify-center rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm text-white hover:bg-white hover:text-[#5F75D7] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5F75D7] md:mr-4 md:w-fit"
            @click="handleInspectChangesButtonClick"
          >
            <EyeIcon class="mr-2 h-5 w-5" />
            Inspect changes
          </button>
          <button
            type="button"
            class="w-full rounded-md border-2 border-[#01D17F] bg-[#01D17F] px-4 py-2 text-sm text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#01D17F] focus:ring-offset-2 focus:ring-offset-[#5F75D7] md:mr-4 md:w-fit"
            @click="handleAcceptButtonClick"
          >
            Accept changes
          </button>
          <button
            type="button"
            class="w-full rounded-md border-2 border-indigo-50 bg-indigo-50 py-2 px-4 text-sm text-[#5F75D7] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-50 focus:ring-offset-2 focus:ring-offset-[#5F75D7] md:w-fit"
            @click="handleRejectButtonClick"
          >
            Reject changes
          </button>
        </div>
      </div>
    </template>
  </BaseFullscreenDialog>
</template>

<script>
import { defineComponent } from 'vue'
import BaseFullscreenDialog from '@/app/components/BaseFullscreenDialog.vue'
import { EyeIcon } from '@heroicons/vue/outline'
import { useAcceptChangesDialogStore } from '@/domain/updateTopic/services/useAcceptChangesDialogStore.js'
import { useProposalsStore } from '@/domain/updateTopic/services/useProposalsStore.js'
import { storeToRefs } from 'pinia'

export const componentName = 'AcceptChangesDialog'

export default defineComponent({
  name: componentName,
  components: {
    BaseFullscreenDialog,
    EyeIcon,
  },
  setup() {
    const useAcceptChangesDialog = useAcceptChangesDialogStore()
    const useProposals = useProposalsStore()

    const { dialogIsVisible, proposal } = storeToRefs(useAcceptChangesDialog)

    const handleInspectChangesButtonClick = async () => {
      useAcceptChangesDialog.close()
    }

    const handleAcceptButtonClick = async () => {
      const proposalId = proposal.value.id
      useAcceptChangesDialog.close()
      await useProposals.acceptProposal(proposalId)
    }

    const handleRejectButtonClick = async () => {
      const proposalId = proposal.value.id
      useAcceptChangesDialog.close()
      await useProposals.rejectProposal(proposalId)
    }

    return {
      componentName,
      handleAcceptButtonClick,
      handleRejectButtonClick,
      handleInspectChangesButtonClick,
      proposal,
      dialogIsVisible,
    }
  },
})
</script>
