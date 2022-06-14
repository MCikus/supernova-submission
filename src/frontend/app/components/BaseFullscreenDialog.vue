<template>
  <Transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="isDialogVisible"
      class="absolute z-50 flex h-screen w-screen justify-center bg-[#5F75D7] py-10 px-4 md:p-20"
      :class="[componentName, $attrs.class]"
    >
      <button
        v-if="!disableCloseButton"
        class="absolute top-2 right-2 md:top-10 md:right-10"
        @click="isDialogVisible = false"
      >
        <XIcon class="h-10 w-10 text-white" />
      </button>
      <slot name="dialogContent">
        <div class="flex h-full w-full items-center justify-center rounded-md bg-white">
          Default Dialog content
        </div>
      </slot>
    </div>
  </Transition>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { XIcon } from '@heroicons/vue/outline'

export const componentName = 'BaseFullscreenDialog'

export default defineComponent({
  name: componentName,
  components: {
    XIcon,
  },
  props: {
    dialogIsVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
    disableCloseButton: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  emits: ['dialogVisibilityChanged'],
  setup(props, { emit }) {
    const isDialogVisible = computed({
      get() {
        return props.dialogIsVisible
      },
      set(value) {
        emit('dialogVisibilityChanged', value)
      },
    })

    return {
      componentName,
      isDialogVisible,
    }
  },
})
</script>
