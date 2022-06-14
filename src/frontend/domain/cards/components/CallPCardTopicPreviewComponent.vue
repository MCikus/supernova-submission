<template>
  <CardTopicPreview :card-props="jsonArchive"></CardTopicPreview>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'CallPCardTopicPreviewComponent'
import CardTopicPreview from '@/domain/cards/components/CardTopicPreview.vue'
import cardTopicPreview from './card_topic_preview.json'

export default defineComponent({
  name: componentName,
  components: {
    CardTopicPreview,
  },
  setup: () => {
    return {
      componentName,
      jsonArchive: cardTopicPreview,
    }
  },
})
</script>
