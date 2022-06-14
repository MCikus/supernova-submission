<template>
  <h3 class="h-72px w-full text-lg font-medium leading-6 text-gray-900">{{ title }}</h3>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'PCardTitle'

export default defineComponent({
  name: componentName,
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup: () => ({ componentName }),
})
</script>
