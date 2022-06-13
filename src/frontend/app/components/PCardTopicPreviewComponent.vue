<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-white">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-6 space-y-4 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        <div class="border border-gray-200 rounded-lg shadow-sm w-80 h-480px">
          <div class="px-5 pt-4">
            <PCardTitle></PCardTitle>
            <p class="text-gray-600 mb-6">Brief description of this topic so that a user can get a first rough idea of what this topic is really about.</p>
            <PCardTopicStatisticsBlock></PCardTopicStatisticsBlock>
            <PCardTopicActionGroup></PCardTopicActionGroup>
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

export default defineComponent({
  name: componentName,
  components: {
    PCardTitle,
    PCardTopicStatisticsBlock,
    PCardTopicActionGroup
  },
  setup: () => ({ componentName }),
})
</script>
