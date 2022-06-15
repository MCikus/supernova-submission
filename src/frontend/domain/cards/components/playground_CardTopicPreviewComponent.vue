<template>
  <div class="m-10 flex space-x-4">
    <CardTopicPreview :card-data="previewCard" />
    <CardTopicPreview :card-data="marketingCard" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'playground_CardTopicPreviewComponent'
import CardTopicPreview from '@/domain/cards/components/CardTopicPreview.vue'
import mockData from './card_topic_preview.json'

export default defineComponent({
  name: componentName,
  components: {
    CardTopicPreview,
  },
  setup: () => {
    const marketingMockData = JSON.parse(JSON.stringify(mockData))
    marketingMockData.meta.isMarketingCard.payload = { value: true }

    return {
      componentName,
      previewCard: JSON.parse(JSON.stringify(mockData)),
      marketingCard: { ...marketingMockData },
    }
  },
})
</script>
