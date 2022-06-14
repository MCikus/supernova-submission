<template>
  <component
    :is="computedTag"
    v-if="!isUnstyled"
    class="bg-primary inline-flex items-center justify-center rounded-angularness border border-transparent text-primary-content hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2"
    :class="[...computedSizeCss, ...computedDisabledCss, $options.name]"
    :disabled="isDisabled"
    v-bind="computedAttributes"
    @click.stop="handleClick($event)"
  >
    <slot />
  </component>
  <component
    :is="computedTag"
    v-else
    :class="[$options.name]"
    :disabled="isDisabled"
    v-bind="computedAttributes"
    @click.stop="handleClick"
  >
    <slot />
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import ALink from './ALink.vue'
import get from 'lodash/get'

const buttonSizes = {
  DEFAULT: ['px-4', 'py-2', 'text-sm'],
  xs: ['px-2.5', 'py-1.5', 'text-xs'],
  sm: ['px-3', 'py-2', 'text-sm', 'leading-4'],
  base: ['px-4', 'py-2', 'text-sm'],
  lg: ['px-4', 'py-2', 'text-base'],
  xl: ['px-6', 'py-3', 'text-base'],
}

export default defineComponent({
  name: 'AButton',
  components: {
    ALink,
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({
        id: null,
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
    size: {
      type: String,
      default: 'base',
    },
  },
  emits: ['a-button-clicked'],
  computed: {
    computedTag() {
      if (this.componentData.url || this.componentData.path) {
        return 'ALink'
      }
      return 'button'
    },
    computedAttributes() {
      if (this.componentData.path || this.componentData.url) {
        return {
          componentData: this.componentData,
          isDisabled: this.isDisabled,
          isUnstyled: true,
        }
      }
      return {}
    },
    computedSizeCss() {
      return get(buttonSizes, this.size, buttonSizes.DEFAULT)
    },
    computedDisabledCss() {
      return this.isDisabled ? ['bg-primary-disabled', 'pointer-events-none'] : []
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('a-button-clicked', {
        componentName: this.$options.name,
        event: event,
      })
    },
  },
})
</script>

<style scoped></style>
