<template>
  <BaseFullscreenDialog
    class="pt-24 md:pt-40"
    :class="componentName"
    :dialog-is-visible="dialogIsVisible"
    @dialogVisibilityChanged="dialogIsVisible = $event"
  >
    <template #dialogContent>
      <div class="flex h-full w-full max-w-3xl flex-col items-start justify-start">
        <div class="flex w-full flex-nowrap">
          <span class="mr-6 inline-flex h-10 w-1 bg-[#01D17F]" />
          <InlineInput
            class="text-4xl text-white placeholder-white placeholder-opacity-50 hover:text-white"
            :multiline="true"
            :value="topicName"
            placeholder="Name your topic"
            @inline-input-changed="topicNameHasChanged"
          />
        </div>
        <div class="mt-12 flex flex-nowrap items-center">
          <button
            type="button"
            class="mr-4 rounded-md bg-[#01D17F] px-4 py-2.5 text-sm text-white"
            @click="handleButtonClick"
          >
            Next
          </button>
          <span class="cursor-default text-sm text-white">
            press
            <span class="font-bold">Enter ↵</span>
          </span>
        </div>
      </div>
    </template>
  </BaseFullscreenDialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BaseFullscreenDialog from '@/app/components/BaseFullscreenDialog.vue'
import InlineInput from '@/domain/cards/components/InlineInput.vue'
import { useCreateNewTopicDialogStore } from '@/domain/createTopic/services/useCreateNewTopicDialogStore.js'
import { useTopicsStore } from '@/app/services/useTopicsStore.js'
import { onKeyStroke } from '@vueuse/core'
import { storeToRefs } from 'pinia'

export const componentName = 'CreateNewTopicDialog'

export default defineComponent({
  name: componentName,
  components: {
    BaseFullscreenDialog,
    InlineInput,
  },
  setup() {
    const useCreateNewTopicDialog = useCreateNewTopicDialogStore()
    const useTopics = useTopicsStore()

    const { dialogIsVisible } = storeToRefs(useCreateNewTopicDialog)
    const topicName = ref('')

    const topicNameHasChanged = ({ event }) => {
      topicName.value = event.target.value
    }

    const handleButtonClick = () => {
      if (topicName.value === '') {
        return
      }
      useTopics.addNewTopic(topicName.value)
      useCreateNewTopicDialog.close()
      topicName.value = ''
    }

    onKeyStroke('Enter', (e) => {
      e.preventDefault()
      if (topicName.value === '') {
        return
      }
      useTopics.addNewTopic(topicName.value)
      useCreateNewTopicDialog.close()
      topicName.value = ''
    })

    return {
      componentName,
      topicNameHasChanged,
      handleButtonClick,
      topicName,
      dialogIsVisible,
    }
  },
})
</script>
