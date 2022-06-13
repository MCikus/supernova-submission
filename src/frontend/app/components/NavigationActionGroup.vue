<template>
  <div class="flex" :class="componentName">
    <a href="/dashboard" class="hidden md:inline-flex">
      <HomeIcon class="h-[1.125rem] w-[1.125rem] text-white" />
    </a>
    <a
      href="/dashboard"
      class="block w-full px-4 py-3 text-sm font-normal leading-none text-base-700 hover:bg-base-200 md:hidden"
    >
      <HomeIcon class="h-3.5 w-3.5" />
    </a>
    <div class="w-full border-t border-gray-100 md:hidden" />
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
