<template>
  <PCardTopicPreview :card-props="json_archive"></PCardTopicPreview>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'CallPCardTopicPreviewComponent'
import PCardTopicPreview from '@/app/components/PCardTopicPreview.vue'
import cardTopicPreview from './card_topic_preview.json'

export default defineComponent({
  name: componentName,
  components: {
    PCardTopicPreview,
  },
  setup: () => ({ componentName }),
  computed: {
    json_archive() {
      return cardTopicPreview
    },
  },
})
</script>