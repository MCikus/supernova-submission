<template>
  <div v-if="isMarketingCard">
    <div
      class="hover:font-semi-bold flex w-full items-center justify-center pt-27px text-center text-sm text-primary"
    >
      Coming Soon
    </div>
  </div>
  <div v-else>
    <button
      type="button"
      class="mb-4 flex h-38px w-full items-center justify-center rounded-md border border-transparent bg-accent text-center text-sm font-medium text-base-100 text-white shadow-sm hover:bg-accent-focus"
      @click="getStartedAction"
    >
      Get started with topic
    </button>
    <div
      class="flex w-full items-center justify-center text-center text-primary hover:text-primary-focus"
    >
      <u class="mt-[9px] cursor-pointer text-sm" @click="previewTopic">Preview Topic</u>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'CardTopicActionsGroup'

export default defineComponent({
  name: componentName,
  props: {
    isMarketingCard: {
      type: Boolean,
      default: false,
    },
    getStartedAction: {
      type: Function,
      // eslint-disable-next-line no-console
      default: () => console.error('🚨', componentName + ' get started topic is missing'),
    },
    previewTopic: {
      type: Function,
      // eslint-disable-next-line no-console
      default: () => console.error('🚨', componentName + ' preview topic is missing'),
    },
  },
  setup: () => ({ componentName }),
})
</script>
