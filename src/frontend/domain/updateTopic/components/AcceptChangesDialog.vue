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
          <h1 class="text-4xl text-white">{{proposal?.title}}</h1>
          <p class="text-4xl text-white mt-6 md:mt-12">{{proposal?.description}}</p>
          <span class="block text-white mt-4 md:mt-8 text-sm">
            Submitted by {{proposal?.proposer}}
          </span>
        </div>
        <div class="flex flex-col flex-nowrap items-center space-y-4 mt-4 md:flex-row md:mt-12 md:space-y-0">
          <button
            type="button"
            class="flex flex-nowrap justify-center md:mr-4 w-full md:w-fit rounded-md bg-transparent border-2 border-white px-4 py-2 text-sm text-white hover:bg-white hover:text-[#5F75D7] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5F75D7]"
            @click="handleInspectChangesButtonClick"
          >
            <EyeIcon class="h-5 w-5 mr-2"/> Inspect changes
          </button>
          <button
            type="button"
            class="md:mr-4 w-full md:w-fit rounded-md border-2 border-[#01D17F] bg-[#01D17F] px-4 py-2 text-sm text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#01D17F] focus:ring-offset-2 focus:ring-offset-[#5F75D7]"
            @click="handleAcceptButtonClick"
          >
            Accept changes
          </button>
          <button
            type="button"
            class="rounded-md w-full md:w-fit border-2 border-indigo-50 bg-indigo-50 py-2 px-4 text-sm text-[#5F75D7] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-50 focus:ring-offset-2 focus:ring-offset-[#5F75D7]"
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
import { defineComponent, ref } from 'vue'
import BaseFullscreenDialog from '@/app/components/BaseFullscreenDialog.vue'
import {EyeIcon} from '@heroicons/vue/outline'
import { useAcceptChangesDialogStore} from '@/domain/updateTopic/services/useAcceptChangesDialogStore.js'
import { useProposalsStore } from "@/domain/updateTopic/services/useProposalsStore.js"
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
