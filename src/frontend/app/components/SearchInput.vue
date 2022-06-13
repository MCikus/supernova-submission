<template>
  <div ref="searchInputRef" class="flex" :class="componentName">
    <div v-if="searchInputVisible" class="lg:max-w-xs w-full max-w-lg">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon class="text-base-200 h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search"
          ref="inputFieldRef"
          v-model="computedInputValue"
          name="search"
          class="sm:text-sm text-base-200 placeholder-base-2000 block w-full rounded-md border border-transparent bg-white py-1.5 pl-10 pr-3 leading-5 focus:border-white focus:text-base-content focus:outline-none focus:ring-gray-300"
          placeholder="Search"
          type="search"
          @keydown.esc="computedInputValue = ''"
        />
      </div>
    </div>
    <button v-if="!searchInputVisible" @click="openMenu">
      <SearchIcon class="h-[1.125rem] w-[1.125rem] text-white" />
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
