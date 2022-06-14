<template>
  <h3 class="h-72px w-full text-lg font-medium font-bold leading-6 text-base-content">
    {{ title }}
  </h3>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'CardTitle'

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
