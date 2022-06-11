<template>
  <textarea
    v-if="editing && multiline"
    ref="inputEl"
    class="h-full w-full resize-none border-0 bg-transparent p-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
    :class="[$attrs.class, componentName]"
    type="textarea"
    wrap="hard"
    maxlength="208"
    :value="computedValue"
    :placeholder="computedPlaceholder"
    @keydown.enter="handleKeyDownEnter"
    @blur="handleInputChanged"
  />
  <input
    v-if="editing && !multiline"
    ref="inputEl"
    class="m-0 w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
    :class="[$attrs.class, componentName]"
    type="text"
    :value="computedValue"
    :placeholder="computedPlaceholder"
    @keydown.enter="handleKeyDownEnter"
    @blur="handleInputChanged"
  />
  <div
    v-if="!editing"
    ref="labelEl"
    class="hyphens-auto hover:cursor-text hover:text-gray-600"
    :class="[
      $attrs.class,
      multiline ? 'line-clamp-' + maxLines : 'truncate',
      componentName,
    ]"
    @click="editByInlineClick ? toggle() : null"
  >
    {{ computedLabel }}
  </div>
  <span
    v-if="!editByInlineClick"
    class="inline-block w-fit text-[#5F75D7] underline"
    :class="$attrs.class"
    @click="toggle"
  >
    edit
  </span>
</template>
<script>
import { computed, nextTick, ref } from 'vue'

const componentName = 'InlineInput'

export default {
  props: {
    value: {
      type: String,
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    maxLines: {
      type: Number,
      default: () => 5,
    },
    multiline: {
      type: Boolean,
      default: true,
    },
    editByInlineClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['inline-input-changed', 'inline-input-is-editing'],
  setup(props, { emit }) {
    const editing = ref(false)
    const labelEl = ref(null)
    const inputEl = ref(null)

    const toggle = async () => {
      editing.value = !editing.value

      emit('inline-input-is-editing', {
        componentName: componentName,
        isEditing: editing.value,
      })

      if (editing.value) {
        await nextTick(() => {
          inputEl.value.focus()
          inputEl.value.select()
        })
      }
    }

    const handleKeyDownEnter = (event) => {
      event.preventDefault()
      inputEl.value.blur()
    }

    const handleInputChanged = (event) => {
      toggle()

      if (event.target.value !== computedValue.value) {
        emit('inline-input-changed', {
          componentName: componentName,
          event: event,
        })
      }
    }

    const computedLabel = computed(() => {
      return props.value === '' ? props.placeholder : props.value
    })

    const computedValue = computed(() => props.value)

    const computedPlaceholder = computed(() => props.placeholder)

    return {
      componentName,
      labelEl,
      inputEl,
      computedLabel,
      editing,
      computedValue,
      computedPlaceholder,
      handleInputChanged,
      handleKeyDownEnter,
      toggle,
    }
  },
}
</script>
