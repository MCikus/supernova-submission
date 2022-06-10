<template>
  <BaseFullscreenDialog class="pt-24 md:pt-40" :class="componentName" :dialog-is-visible="dialogIsVisible" @dialogVisibilityChanged="dialogIsVisible = $event">
      <template #dialogContent>
        <div class="flex flex-col justify-start items-start w-full max-w-3xl h-full">
          <div class="flex flex-nowrap w-full">
            <span class="inline-flex h-10 w-1 mr-6 bg-[#01D17F]" />
            <InlineInput
              class="text-4xl text-white hover:text-white placeholder-white placeholder-opacity-50"
              :multiline="true"
              :value="topicName"
              @inline-input-changed="topicNameHasChanged"
              placeholder="Name your topic"
            />
          </div>
          <div class="flex flex-nowrap items-center mt-12">
            <button type="button" @click="handleButtonClick" class="px-4 py-2.5 mr-4 rounded-md bg-[#01D17F] text-white text-sm">Next</button>
            <span class="text-white text-sm cursor-default">Press <span class="font-bold">Enter ↵</span></span>
          </div>
        </div>
      </template>
  </BaseFullscreenDialog>
</template>

<script>
import { defineComponent, ref } from "vue"
import BaseFullscreenDialog from "@/app/components/BaseFullscreenDialog.vue"
import InlineInput from "@/domain/cards/components/InlineInput.vue"
import { useCreateNewTopicDialogStore } from "@/domain/createTopic/services/useCreateNewTopicDialogStore.js"
import { useTopicsStore } from "@/app/services/useTopicsStore.js"
import { onKeyStroke } from '@vueuse/core'
import { storeToRefs } from "pinia"

export const componentName = 'CreateNewTopicDialog'

export default defineComponent({
  name: componentName,
  components: {
    BaseFullscreenDialog,
    InlineInput
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
      if(topicName.value === ''){
        return
      }
      useTopics.addNewTopic(topicName.value)
      useCreateNewTopicDialog.close()
      topicName.value = ''
    }

    onKeyStroke('Enter', (e) => {
      e.preventDefault()
      if(topicName.value === ''){
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
