<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-6 space-y-4 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        <div class="border border-gray-200 rounded-lg shadow-sm w-80 h-480px">
          <div class="px-5 pt-4">
            <PCardTitle :title="cardProps.title"></PCardTitle>
            <p class="text-gray-600 mb-6">{{cardProps.meta.description.payload.value}}</p>
            <PCardTopicStatisticsBlock :statistics="cardProps.meta.statistics"></PCardTopicStatisticsBlock>
            <PCardTopicActionGroup :is-marketing="cardProps.meta.statistics?.isMarketingCard"></PCardTopicActionGroup>
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

let cardProps;
export default defineComponent({
  name: componentName,
  components: {
    PCardTitle,
    PCardTopicStatisticsBlock,
    PCardTopicActionGroup
  },
  props: {
    cardProps
  },
  setup: () => ({ componentName }),
})
</script>
