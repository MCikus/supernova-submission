<template>
  <div class="h-screen overflow-hidden" :class="$options.name">
    <ONavBar class="absolute left-0 right-0 top-0" />
    <div class="flex h-full w-full flex-col justify-center">
      <AHeader
        class="md:-translate-y-36 -translate-y-24 transform text-center text-primary-content"
        :component-data="componentData.header"
      >
        Login
      </AHeader>
      <OLoginCard
        class="md:-translate-y-36 -translate-y-24 transform"
        :component-data="componentData.loginCard"
        @a-text-input-changed="inputHandler($event)"
        @a-button-clicked="handleClick($event)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AHeader from '../../../app/components/AHeader.vue'
import OLoginCard from './OLoginCard.vue'
import ONavBar from '../../../app/components/ONavBar.vue'

export default defineComponent({
  name: 'TLandingPage',
  components: {
    AHeader,
    OLoginCard,
    ONavBar,
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({
        header: {
          level: null,
        },
        loginCard: {
          label: null,
          type: null,
          name: null,
          placeholder: null,
          value: null,
          messages: {
            infoMessage: null,
            hintMessage: null,
            errorMessage: null,
          },
        },
      }),
    },
  },
  emits: ['a-text-input-changed', 'a-button-clicked'],
  methods: {
    inputHandler(event) {
      this.$emit('a-text-input-changed', {
        componentName: this.$options.name,
        event: event,
      })
    },
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
