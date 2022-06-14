<template>
  <BaseFullscreenDialog
    class="bg-[#1D202BB2] bg-opacity-70 py-20 backdrop-blur-sm"
    :class="componentName"
    :dialog-is-visible="dialogIsVisible"
    :disable-close-button="true"
  >
    <template #dialogContent>
      <div
        ref="dialogRef"
        class="flex h-full w-full max-w-5xl flex-col items-start justify-start rounded-lg bg-white"
      >
        <div class="h-[160px] w-full px-5 pt-4 pb-6">
          {{ expandedCard.title }}
          <button @click="closeDialog()">close dialog</button>
        </div>
        <div class="h-[1px] w-full bg-base-200"></div>
        <div class="w-full grow overflow-y-scroll px-36 pt-4 pb-6">
          <BlockList :card="expandedCard" />
          <BlockSelector :card-id="expandedCard.id" />
        </div>
        <div class="h-[1px] w-full bg-base-200"></div>
        <div
          class="flex h-[96px] w-full flex-row items-center justify-between px-5 pt-4 pb-6"
        >
          <button
            class="flex flex-nowrap rounded-md border-2 border-[#EEF2FF] px-4 py-2 text-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4338CA] focus:ring-offset-2 focus:ring-offset-white"
            :class="
              previousButtonDisabled
                ? 'pointer-events-none bg-gray-100 text-gray-400'
                : 'bg-[#EEF2FF] text-[#4338CA]'
            "
            @click="previousCard()"
          >
            <ArrowLeftIcon class="mr-2 h-5 w-5" />
            Previous
          </button>
          <button
            class="flex flex-nowrap rounded-md border-2 border-[#EEF2FF] px-4 py-2 text-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4338CA] focus:ring-offset-2 focus:ring-offset-white"
            :class="
              nextButtonDisabled
                ? 'pointer-events-none bg-gray-100 text-gray-400'
                : 'bg-[#EEF2FF] text-[#4338CA]'
            "
            @click="nextCard()"
          >
            Next
            <ArrowRightIcon class="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </template>
  </BaseFullscreenDialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BaseFullscreenDialog from '@/app/components/BaseFullscreenDialog.vue'
import BlockList from '@/domain/blocks/base/components/BlockList.vue'
import BlockSelector from '@/domain/blocks/base/components/BlockSelector.vue'
import { useCardExpandedDialogStore } from '@/domain/cardExpanded/services/useCardExpandedDialogStore.js'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/outline'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'

export const componentName = 'CardExpandedDialog'

export default defineComponent({
  name: componentName,
  components: {
    BaseFullscreenDialog,
    BlockList,
    BlockSelector,
    ArrowLeftIcon,
    ArrowRightIcon,
  },
  setup() {
    const useCardExpandedDialog = useCardExpandedDialogStore()
    const { dialogIsVisible, expandedCard, nextButtonDisabled, previousButtonDisabled } =
      storeToRefs(useCardExpandedDialog)
    const dialogRef = ref(null)

    const closeDialog = () => {
      useCardExpandedDialog.close()
    }
    onClickOutside(dialogRef, () => closeDialog())

    return {
      componentName,
      dialogIsVisible,
      dialogRef,
      expandedCard,
      closeDialog,
      nextCard: useCardExpandedDialog.nextCard,
      previousCard: useCardExpandedDialog.previousCard,
      nextButtonDisabled,
      previousButtonDisabled,
    }
  },
})
</script>
