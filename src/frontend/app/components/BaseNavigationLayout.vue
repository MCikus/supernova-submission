<template>
  <div class="md:px-6 2xl:px-16 w-full px-4 py-[1.125rem]" :class="componentName">
    <div class="flex flex-row items-center">
      <slot name="left" />
      <slot name="center" />
      <slot name="right" />
    </div>
    <slot name="bottom" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'BaseNavigationLayout'

export default defineComponent({
  name: componentName,
  setup: () => ({ componentName }),
})
</script>

<style scoped></style>
