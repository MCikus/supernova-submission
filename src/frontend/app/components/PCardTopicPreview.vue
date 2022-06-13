<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="mt-6 space-y-4 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none">
        <div class="h-480px w-80 rounded-lg border border-gray-200 shadow-sm">
          <div class="px-5 pt-4">
            <PCardTitle :title="cardProps.title"></PCardTitle>
            <p class="mb-6 text-gray-600">
              {{ cardProps.meta.description.payload.value }}
            </p>
            <PCardTopicStatisticsBlock
              :statistics="cardProps.meta.statistics"
            ></PCardTopicStatisticsBlock>
            <PCardTopicActionGroup
              :is-marketing="cardProps.meta.statistics?.isMarketingCard"
            ></PCardTopicActionGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'PCardTopicPreviewComponent'
import PCardTitle from '@/app/components/PCardTitle.vue'
import PCardTopicStatisticsBlock from '@/app/components/PCardTopicStatisticsBlock.vue'
import PCardTopicActionGroup from '@/app/components/PCardTopicActionGroup.vue'

let cardProps
export default defineComponent({
  name: componentName,
  components: {
    PCardTitle,
    PCardTopicStatisticsBlock,
    PCardTopicActionGroup,
  },
  props: {
    cardProps,
  },
  setup: () => ({ componentName }),
})
</script>
