<template>
  <div class="flex flex-row flex-nowrap items-center" :class="$options.name">
    <div
      class="min-w[4rem] md:h-10 md:w-20 md:min-w-[5rem] h-8 w-16 cursor-pointer rounded-lg bg-primary-content"
      @click="handleClick($event)"
    />
    <span
      class="md:text-2xl ml-5 truncate text-lg font-normal leading-8 text-primary-content"
    >
      {{ computedParentName }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AParentCardButton',
  props: {
    componentData: {
      type: Object,
      default: () => ({
        parent: null,
      }),
    },
  },
  emits: ['a-parent-card-button-clicked'],
  computed: {
    computedParentName() {
      return `${this.componentData.parent?.enumeration.join('.')} ${
        this.componentData.parent?.title
      }`
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('a-parent-card-button-clicked', {
        componentName: this.$options.name,
        event: event,
      })
    },
  },
}
</script>

<style scoped></style>
