<template>
  <div ref="searchInputRef" class="flex" :class="componentName">
    <div v-if="searchInputVisible" class="w-full max-w-lg lg:max-w-xs">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon class="h-[24px] w-[24px] text-base-200" aria-hidden="true" />
        </div>
        <input
          id="search"
          ref="inputFieldRef"
          v-model="computedInputValue"
          name="search"
          class="placeholder-base-2000 block w-full rounded-md border border-transparent bg-white py-1.5 pl-10 pr-3 leading-5 text-base-200 focus:border-white focus:text-base-content focus:outline-none focus:ring-gray-300 sm:text-sm"
          placeholder="Search"
          type="search"
          @keydown.esc="computedInputValue = ''"
        />
      </div>
    </div>
    <button v-if="!searchInputVisible" @click="openMenu">
      <SearchIcon class="h-[24px] w-[24px] text-white" />
    </button>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref } from 'vue'
import { SearchIcon } from '@heroicons/vue/solid'
import { onClickOutside } from '@vueuse/core'

export const componentName = 'SearchInput'

export default defineComponent({
  name: componentName,
  components: {
    SearchIcon,
  },
  props: {
    value: {
      type: String,
      default: () => '',
    },
  },
  emits: ['opened', 'closed', 'input'],
  setup(props, { emit }) {
    const searchInputRef = ref(null)
    const inputFieldRef = ref(null)
    const searchInputVisible = ref(false)

    const computedInputValue = computed({
      get() {
        return props.value
      },
      set(value) {
        emit('input', value)
      },
    })

    const closeMenu = () => {
      if (searchInputVisible.value) {
        searchInputVisible.value = false
        emit('closed')
      }
    }

    const openMenu = async () => {
      if (!searchInputVisible.value) {
        searchInputVisible.value = true
        await nextTick()
        inputFieldRef?.value?.focus()
        emit('opened')
      }
    }

    onClickOutside(searchInputRef, () => closeMenu())

    return {
      componentName,
      searchInputRef,
      inputFieldRef,
      searchInputVisible,
      computedInputValue,
      openMenu,
    }
  },
})
</script>

<style scoped></style>
