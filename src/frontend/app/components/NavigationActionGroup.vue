<template>
  <div class="flex" :class="componentName">
    <a href="/dashboard" class="inline-flex">
      <HomeIcon class="h-6 w-6 text-white" />
    </a>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { HomeIcon } from '@heroicons/vue/outline'

export const componentName = 'NavigationActionGroup'

export default defineComponent({
  name: componentName,
  components: {
    HomeIcon,
  },
  setup: () => ({ componentName }),
})
</script>
