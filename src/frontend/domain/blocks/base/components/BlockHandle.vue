<template>
  <div class="flex flex-nowrap items-center h-fit text-[#5F75D7] mr-2">
    <DotsVerticalIcon class="h-5 w-5 -mr-1.5"/>
    <DotsVerticalIcon class="h-5 w-5 -ml-1.5"/>
    <span class="bg-primary w-0.5 h-6 ml-0.5"></span>
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
