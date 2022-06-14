<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="mt-6 space-y-4 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none">
        <div class="h-480px w-80 rounded-lg border border-gray-200 shadow-sm">
          <div class="px-5 pt-4">
            <CardTitle :title="cardProps.title"></CardTitle>
            <p class="mb-6 text-base-content">
              {{ cardProps.meta.description.payload.value }}
            </p>
            <CardTopicStatisticsBlock
              :statistics="cardProps.meta.statistics"
            ></CardTopicStatisticsBlock>
            <CardTopicActionGroup
              :is-marketing="cardProps.meta.statistics?.isMarketingCard"
            ></CardTopicActionGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'CardTopicPreviewComponent'
import CardTitle from '@/domain/cards/components/CardTitle.vue'
import CardTopicStatisticsBlock from '@/domain/cards/components/CardTopicStatisticsBlock.vue'
import CardTopicActionGroup from '@/domain/cards/components/CardTopicActionGroup.vue'

let cardProps
export default defineComponent({
  name: componentName,
  components: {
    CardTitle,
    CardTopicStatisticsBlock,
    CardTopicActionGroup,
  },
  props: {
    cardProps,
  },
  setup: () => ({ componentName }),
})
</script>
