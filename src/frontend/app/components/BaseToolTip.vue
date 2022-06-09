<template>
  <div
    v-if="orientation === 'top'"
    class="group relative flex w-full flex-col items-center"
  >
    <slot name="wrappedElement" />
    <div
      class="absolute -top-1.5 flex hidden -translate-y-full flex-col items-center group-hover:flex"
    >
      <span
        class="whitespace-no-wrap relative z-10 rounded-md bg-[#B3DAFF] py-2 px-5 text-sm font-bold leading-6 text-gray-900 shadow-lg"
      >
        <slot name="hint" />
      </span>
      <div class="z-10 -mt-3 h-5 w-5 rotate-45 bg-[#B3DAFF]"></div>
    </div>
  </div>
  <div
    v-if="orientation === 'bottom'"
    class="group relative flex w-full flex-col items-center"
  >
    <slot name="wrappedElement" />
    <div
      class="absolute -bottom-1.5 flex hidden translate-y-full flex-col items-center group-hover:flex"
    >
      <div class="z-10 -mb-3 h-5 w-5 rotate-45 bg-[#B3DAFF]"></div>
      <span
        class="whitespace-no-wrap relative z-10 rounded-md bg-[#B3DAFF] py-2 px-5 text-sm font-bold leading-6 text-gray-900 shadow-lg"
      >
        <slot name="hint" />
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'MiljnEnergyIndicator'

export default defineComponent({
  name: componentName,
  props: {
    orientation: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'bottom'].includes(value),
    },
  },
  setup: () => ({ componentName }),
})
</script>
