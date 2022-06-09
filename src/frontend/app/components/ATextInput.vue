<template>
  <div :class="$options.name">
    <label :class="[required ? 'required' : '']" :for="componentData.id" class="w-full">
      {{ computedLabel }}
      <input
        :id="componentData.id"
        :type="computedType"
        :class="[required ? 'required' : '']"
        class="my-1 w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-focus"
        :name="computedName"
        :disabled="disabled"
        :placeholder="componentData.placeholder"
        :value="componentData.value"
        @input.stop="inputHandler($event)"
      />
    </label>
    <span v-if="computedInfoMessage">
      {{ computedInfoMessage }}
    </span>
    <span v-if="computedHintMessage">
      {{ computedHintMessage }}
    </span>
    <span v-if="computedErrorMessage" class="text-state-error">
      {{ computedErrorMessage }}
    </span>
  </div>
</template>

<script>
import get from 'lodash/get'

export default {
  name: 'ATextInput',
  props: {
    componentData: {
      type: Object,
      required: false,
      default: () => ({
        label: null,
        id: null,
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
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['a-text-input-changed'],
  computed: {
    computedName() {
      return this.componentData.name ? this.componentData.name : this.componentData.id
    },
    computedType() {
      return this.componentData.type ? this.componentData.type : 'text'
    },
    computedLabel() {
      return get(this.componentData, 'label', null)
    },
    computedInfoMessage() {
      return get(this.componentData, 'messages.infoMessage', null)
    },
    computedHintMessage() {
      return get(this.componentData, 'messages.hintMessage', null)
    },
    computedErrorMessage() {
      return get(this.componentData, 'messages.errorMessage', null)
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit('a-text-input-changed', {
        componentName: this.$options.name,
        event: event,
      })
    },
  },
}
</script>

<style scoped></style>
