<template>
  <textarea
    v-if="editing && multiline"
    ref="inputEl"
    class="h-full w-full resize-none border-0 bg-transparent p-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
    :class="[$attrs.class, componentName]"
    type="textarea"
    wrap="hard"
    :maxlength="maxlength"
    :value="computedValue"
    :placeholder="computedPlaceholder"
    rows="1"
    @keydown.enter="handleKeyDownEnter"
    @blur="handleInputChanged"
    @input="resizeTextArea($event.target)"
  />
  <input
    v-if="editing && !multiline"
    ref="inputEl"
    class="m-0 w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
    :class="[$attrs.class, componentName]"
    type="text"
    :value="computedValue"
    :placeholder="computedPlaceholder"
    :maxlength="maxlength"
    @keydown.enter="handleKeyDownEnter"
    @blur="handleInputChanged"
  />
  <div
    v-if="!editing"
    ref="labelEl"
    class="hyphens-auto w-full overflow-hidden break-words hover:cursor-text hover:text-gray-600"
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
    class="inline-block w-fit text-secondary-content underline"
    :class="$attrs.class"
    @click.stop="toggle"
  >
    {{ actionTitle }}
  </span>
</template>
<script>
import { computed, nextTick, ref, onMounted, onUpdated, watch } from 'vue'

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
    maxlength: {
      type: Number,
      default: () => 144,
    },
    multiline: {
      type: Boolean,
      default: true,
    },
    editByInlineClick: {
      type: Boolean,
      default: true,
    },
    focusOnMount: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['inline-input-changed', 'inline-input-is-editing'],
  setup(props, { emit }) {
    const editing = ref(false)
    const labelEl = ref(null)
    const inputEl = ref(null)

    const actionTitle = ref('edit')

    watch(editing, async () => {
      actionTitle.value = editing.value === false ? 'edit' : 'save'
    })

    const toggle = async () => {
      editing.value = !editing.value

      emit('inline-input-is-editing', {
        componentName: componentName,
        isEditing: editing.value,
      })

      if (editing.value) {
        await nextTick(() => {
          if (props.multiline) {
            resizeTextArea(inputEl.value)
          }

          inputEl?.value?.focus()
          inputEl?.value?.select()
        })
      }
    }

    const handleKeyDownEnter = (event) => {
      event.preventDefault()
      inputEl?.value?.blur()
    }

    const handleInputChanged = (event) => {
      if (props.editByInlineClick === true) {
        toggle()
      }

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

    const resizeTextArea = (element) => {
      if (!element) {
        return
      }
      element.style.height = 'auto'
      element.style.height = `${element.scrollHeight}px`
    }

    onMounted(() => {
      if (props.focusOnMount) {
        editing.value = true
        inputEl?.value?.focus()
        resizeTextArea(inputEl?.value)
      }
    })

    onUpdated(() => {
      if (props.focusOnMount) {
        editing.value = true
        inputEl?.value?.focus()
        inputEl?.value?.select()
        resizeTextArea(inputEl?.value)
      }
    })

    return {
      componentName,
      resizeTextArea,
      labelEl,
      inputEl,
      computedLabel,
      editing,
      computedValue,
      computedPlaceholder,
      handleInputChanged,
      handleKeyDownEnter,
      toggle,
      actionTitle,
    }
  },
}
</script>
