<template>
  <div class="relative mx-8 flex py-2">
    <span class="absolute top-0 left-0 h-1 w-[134px]" :class="eyebrowColorCss"></span>
    <h1
      class="my-3 w-fit cursor-pointer text-base leading-none text-[#4C5EAC] underline"
      @click="handleTitleClick"
    >
      <slot name="title">header title</slot>
    </h1>
    <slot name="header-actions" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'CardListingHeader'

export default defineComponent({
  name: componentName,
  props: {
    eyebrowColorCss: {
      type: String,
      default: 'bg-[#C79FE7]',
      required: false,
    },
  },
  emits: ['title-has-been-clicked'],
  setup(props, { emit }) {
    const handleTitleClick = (event) => {
      emit('title-has-been-clicked', event)
    }

    return {
      componentName,
      handleTitleClick,
    }
  },
})
</script>
