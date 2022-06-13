<template>
  <button type="button"
          class="flex justify-center mb-4 items-center bg-accent-default w-full text-center border border-transparent text-base-100 font-medium rounded-md shadow-sm text-white h-38px"
  >
    Get started with topic
  </button>
  <div class="flex justify-center items-center w-full text-center text-primary-focus">
    <u class="mt-[9px]">Preview Topic</u>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export const componentName = 'PCardTitle'

export default defineComponent({
  name: componentName,
  setup: () => ({ componentName }),
})
</script>
