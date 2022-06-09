<template>
  <component
    :is="'h' + componentData.level"
    :class="[...computedHeadingSize, $options.name]"
  >
    <slot></slot>
  </component>
</template>

<script>
const headingSizes = {
  1: [
    'text-4xl',
    'leading-10',
    'tracking-tight',
    'font-extrabold',
    'sm:text-5xl',
    'sm:leading-12',
    'md:text-6xl',
    'md:leading-14',
  ],
  2: [
    'text-3xl',
    'leading-9',
    'tracking-tight',
    'font-extrabold',
    'sm:text-4xl',
    'sm:leading-10',
    'md:text-5xl',
    'md:leading-12',
  ],
  3: [
    'text-2xl',
    'leading-8',
    'tracking-tight',
    'font-extrabold',
    'sm:text-3xl',
    'sm:leading-9',
    'md:text-4xl',
    'md:leading-10',
  ],
  4: [
    'text-xl',
    'leading-7',
    'tracking-tight',
    'font-extrabold',
    'sm:text-2xl',
    'sm:leading-8',
    'md:text-3xl',
    'md:leading-9',
  ],
  5: [
    'text-base',
    'leading-6',
    'tracking-normal',
    'font-extrabold',
    'sm:text-lg',
    'sm:leading-7',
    'md:text-xl',
    'md:leading-7',
    'md:tracking-tight',
  ],
  6: [
    'text-sm',
    'leading-5',
    'tracking-normal',
    'font-normal',
    'uppercase',
    'sm:text-base',
    'sm:leading-6',
    'md:text-lg',
    'md:leading-7',
  ],
}

export default {
  name: 'AHeader',
  props: {
    componentData: {
      type: Object,
      default: () => ({
        level: null,
      }),
    },
  },
  computed: {
    computedHeadingSize() {
      return headingSizes[this.componentData?.level ?? '1']
    },
  },
}
</script>

<style scoped></style>
