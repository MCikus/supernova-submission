<template>
  <div class="h-full w-full">
    <CardListingHeader
      eyebrow-color-css="bg-[#C79FE7]"
      @title-has-been-clicked="handleHeaderTitleClick"
    >
      <template #title>
        {{ topicTitle }}
      </template>
    </CardListingHeader>
    <div
      class="no-scrollbar flex h-full w-full overflow-hidden overflow-x-scroll px-6 pb-14"
    >
      <CardListingColumns />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import CardListingHeader from '@/domain/cards/components/CardListingHeader.vue'
import CardListingColumns from '@/domain/cards/components/CardListingColumns.vue'
import { useTopicsStore } from '@/app/services/useTopicsStore.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

export const componentName = 'CardListingForATopic'

export default defineComponent({
  name: componentName,
  components: {
    CardListingHeader,
    CardListingColumns,
  },
  setup() {
    const { topics } = storeToRefs(useTopicsStore())
    const titleCardId = computed(() => useRoute().params.titleCardId)
    const topicTitle = computed(
      () => topics?.value?.find((topic) => topic?.id === titleCardId?.value)?.title,
    )

    const handleHeaderTitleClick = (event) => {
      // eslint-disable-next-line no-console
      console.error('🚨 handleHeaderTitleClick not implemented yet', event)
    }
    return {
      componentName,
      topicTitle,
      handleHeaderTitleClick,
    }
  },
})
</script>
