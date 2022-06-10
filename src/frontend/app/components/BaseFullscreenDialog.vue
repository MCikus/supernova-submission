<template>
  <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="isDialogVisible"
      class="absolute flex justify-center py-10 px-4 md:p-20 w-screen h-screen z-50 bg-[#5F75D7]"
      :class="[componentName, $attrs.class]"
    >
      <button @click="isDialogVisible = false" class="absolute top-2 right-2 md:top-10 md:right-10">
          <XIcon class="h-10 w-10 text-white"/>
      </button>
      <slot name="dialogContent">
          <div class="flex justify-center items-center w-full h-full rounded-md bg-white">
            Default Dialog content
          </div>
      </slot>
    </div>
  </Transition>
</template>

<script>
import { computed, defineComponent } from "vue"
import { XIcon } from '@heroicons/vue/outline'

export const componentName = 'BaseFullscreenDialog'

export default defineComponent({
  name: componentName,
  components: {
    XIcon
  },
  props: {
    dialogIsVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  setup(props, {emit}) {
    const isDialogVisible = computed({
      get(){
        return props.dialogIsVisible
      },
      set(value) {
        emit('dialogVisibilityChanged', value)
      }
    })

    return {
      componentName,
      isDialogVisible
    }
  },
})
</script>
