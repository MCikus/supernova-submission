<template>
    <h3 class="text-lg leading-6 font-medium text-gray-900 w-full h-72px">{{ title }}</h3>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'PCardTitle'

export default defineComponent({
  name: componentName,
  props: {
    title: String
  },
  setup: () => ({ componentName }),
})
</script>
