<template>
  <component
    :is="computedTag"
    v-if="!isUnstyled"
    class="cursor-pointer p-1.5 text-base font-medium leading-5 underline focus:rounded-angularness focus:outline-none focus-visible:ring-2"
    :class="[...computedDisabledCss, $options.name]"
    v-bind="computedAttributes"
  >
    <slot />
  </component>
  <component
    :is="computedTag"
    v-else
    :class="[$options.name]"
    v-bind="computedAttributes"
  >
    <slot />
  </component>
</template>
<script>
export default {
  name: 'ALink',
  props: {
    componentData: {
      type: Object,
      default: () => ({
        url: null,
        path: null,
      }),
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isUnstyled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedTag() {
      return this.componentData.url ? 'a' : 'router-link'
    },
    computedAttributes() {
      return this.computedTag === 'a'
        ? { href: this.componentData.url, target: '_blank' }
        : { to: this.componentData.path }
    },
    computedDisabledCss() {
      return this.isDisabled
        ? [
            'text-accent-disabled',
            'hover:text-accent-disabled',
            'focus:text-accent-disabled',
            'pointer-events-none',
          ]
        : []
    },
  },
}
</script>

<style scoped></style>
