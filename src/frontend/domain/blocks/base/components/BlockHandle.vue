<template>
  <div class="flex h-fit flex-nowrap items-center text-primary">
    <DotsVerticalIcon class="-mr-1.5 h-5 w-5" />
    <DotsVerticalIcon class="-ml-1.5 h-5 w-5" />
    <span class="ml-0.5 h-6 w-0.5 bg-primary"></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { DotsVerticalIcon } from '@heroicons/vue/solid'

export const componentName = 'BlockHandle'

export default defineComponent({
  name: componentName,
  components: {
    DotsVerticalIcon,
  },
  setup() {
    return {
      componentName,
    }
  },
})
</script>

<style scoped></style>
