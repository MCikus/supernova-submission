<template>
  <div
    class="flex h-480px w-80 flex-col rounded-lg border border-gray-200 px-5 pt-4 pb-9 shadow-sm"
  >
    <CardTitle class="flex-none" :title="title"></CardTitle>
    <div class="grow">
      <p v-if="description" class="mb-6 text-base-content">
        {{ description }}
      </p>
      <CardTopicStatisticsBlock :statistics="statistics"></CardTopicStatisticsBlock>
    </div>
    <CardTopicActionGroup
      class="h-[92px] flex-none"
      :is-marketing-card="isMarketingCard"
    ></CardTopicActionGroup>
  </div>
</template>

<script>
import { defineComponent, toRaw, computed } from 'vue'

export const componentName = 'CardTopicPreviewComponent'
import CardTitle from '@/domain/cards/components/CardTitle.vue'
import CardTopicStatisticsBlock from '@/domain/cards/components/CardTopicStatisticsBlock.vue'
import CardTopicActionGroup from '@/domain/cards/components/CardTopicActionGroup.vue'

export default defineComponent({
  name: componentName,
  components: {
    CardTitle,
    CardTopicStatisticsBlock,
    CardTopicActionGroup,
  },
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup: (props) => {
    const isMarketing = computed(
      () => props?.cardData?.meta?.isMarketingCard?.payload?.value ?? false,
    )
    const statistics = computed(() => {
      const rawStatistics = props?.cardData?.meta?.statistics?.payload?.value ?? {}

      if (isMarketing.value === false) {
        return rawStatistics
      }

      return {
        cardCount: rawStatistics.cardCount,
        knowledgeContributors: rawStatistics.knowledgeContributors,
      }
    })

    return {
      componentName,
      title: props.cardData.title,
      description: props?.cardData?.meta?.description?.payload?.value ?? null,
      statistics: statistics,
      isMarketingCard: isMarketing,
    }
  },
})
</script>
