<template>
    <div class="flex relative mx-8 py-2">
      <span class="absolute top-0 left-0 h-1 w-[134px]" :class="eyebrowColorCss"></span>
      <h1 @click="handleTitleClick" class="text-base text-[#4C5EAC] leading-none my-3 underline cursor-pointer w-fit">
        <slot name="title">
          header title
        </slot>
      </h1>
      <slot name="header-actions"/>
    </div>
</template>

<script>
import { defineComponent } from "vue"

export const componentName = 'CardListingHeader'

export default defineComponent({
  name: componentName,
  props: {
    eyebrowColorCss: {
      type: String,
      default: 'bg-[#C79FE7]',
      required: false
    }
  },
  emit: ['title-has-been-clicked'],
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