<template>
  <div :class="$options.name" class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="space-y-4 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <ATextInput
        :component-data="componentData"
        :required="true"
        @a-text-input-changed="inputHandler($event)"
      />
      <AButton
        class="w-full"
        :is-disabled="isDisabled"
        size="base"
        @a-button-clicked="handleClick($event)"
      >
        Login
      </AButton>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AButton from '../../../app/components/AButton.vue'
import ATextInput from '../../../app/components/ATextInput.vue'

export default defineComponent({
  name: 'OLoginCard',
  components: {
    AButton,
    ATextInput,
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({
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
      }),
    },
  },
  emits: ['a-text-input-changed', 'a-button-clicked'],
  data() {
    return {
      isDisabled: false,
    }
  },
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
