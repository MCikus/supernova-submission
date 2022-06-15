<template>
  <div v-for="(item, index) in items" :key="index">
    <hr />
    <div class="ml-5 flex py-3">
      <component :is="item.icon" class="h-6 w-6 text-primary" />
      <p class="ml-3 text-sm text-base-content">{{ item.value }} {{ item.title }}</p>
    </div>
    <hr v-if="items.length - 1 === index" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { ViewGridAddIcon, UsersIcon, UserGroupIcon } from '@heroicons/vue/outline'
import { defineComponent } from 'vue'

export const componentName = 'CardTopicStatisticsBlock'

export default defineComponent({
  name: componentName,
  components: {
    ViewGridAddIcon,
    UsersIcon,
    UserGroupIcon,
  },
  props: {
    statistics: {
      type: Object,
      default: () => ({}),
    },
  },
  setup: (props) => {
    const items = [
      {
        id: 'cards',
        title: 'Cards',
        value: props?.statistics?.cardCount ?? 0,
        icon: 'ViewGridAddIcon',
      },
      {
        id: 'knowledge',
        title: 'Knowledge Contributors',
        value: props?.statistics?.knowledgeContributors ?? 0,
        icon: 'UsersIcon',
      },
      {
        id: 'mjne',
        title: '$MJNE Contributors',
        value: props?.statistics?.mjneContributors ?? 0,
        icon: 'UserGroupIcon',
      },
    ]

    return {
      items: computed(() => items.filter((item) => item.value > 0)),
      cardCount: props?.cardCount,
      knowledgeContributors: props?.knowledgeContributors,
      mjneContributors: props?.mjneContributors,
      componentName,
    }
  },
})
</script>
