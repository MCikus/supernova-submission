<template>
  <div v-if="isMarketing?.payload?.value === false">
    <button
      type="button"
      class="mb-4 flex h-38px w-full items-center justify-center rounded-md border border-transparent bg-accent-default text-center text-sm font-medium text-base-100 text-white shadow-sm"
      @click="getStartedAction()"
    >
      Get started with topic
    </button>
    <div class="flex w-full items-center justify-center text-center text-primary-focus">
      <u class="mt-[9px] cursor-pointer text-sm" @click="previewTopic()">Preview Topic</u>
    </div>
  </div>
  <div v-else>
    <div
      class="flex w-full items-center justify-center pt-27px text-center text-primary-default"
    >
      Coming Soon
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'CardTopicActionsGroup'

let isMarketing
export default defineComponent({
  name: componentName,
  props: {
    isMarketing,
  },
  setup: () => ({ componentName }),
  methods: {
    getStartedAction: function () {
      console.error('🚨', componentName + ' get started topic is missing')
    },
    previewTopic: function () {
      console.error('🚨', componentName + ' preview topic is missing')
    },
  },
})
</script>
