<template>
  <BaseFullscreenDialog
    class="bg-[#1D202BB2] bg-opacity-70 py-20"
    :class="componentName"
    :dialog-is-visible="dialogIsVisible"
    :disable-close-button="true"
  >
    <template #dialogContent>
      <div ref="dialogRef" class="flex h-full w-full max-w-5xl flex-col items-start justify-start bg-white rounded-lg">

      </div>
    </template>
  </BaseFullscreenDialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BaseFullscreenDialog from '@/app/components/BaseFullscreenDialog.vue'
import InlineInput from '@/domain/cards/components/InlineInput.vue'
import { useCardExpandedDialogStore } from '@/domain/cardExpanded/services/useCardExpandedDialogStore.js'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'

export const componentName = 'CardExpandedDialog'

export default defineComponent({
  name: componentName,
  components: {
    BaseFullscreenDialog,
    InlineInput,
  },
  setup() {
    const useCardExpandedDialog = useCardExpandedDialogStore()
    const { dialogIsVisible } = storeToRefs(useCardExpandedDialog)
    const dialogRef = ref(null)

    onClickOutside(dialogRef, () => useCardExpandedDialog.close())

    return {
      componentName,
      dialogIsVisible,
      dialogRef,
    }
  },
})
</script>
