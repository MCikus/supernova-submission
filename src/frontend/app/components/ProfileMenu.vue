<template>
  <BaseDropDown>
    <template #menuButton="{ toggleMenu }">
      <button @click="toggleMenu">
        <span class="sr-only">Open options</span>
        <UserAvatar :name="userName" />
      </button>
    </template>
    <template #items="{ closeMenu, openMenu, toggleMenu }">
      <slot
        name="prependItems"
        :toggleMenu="toggleMenu"
        :closeMenu="closeMenu"
        :openMenu="openMenu"
      />
      <div class="mt-2 flex cursor-text items-center gap-2 px-5 py-2 hover:bg-gray-50">
        <div
          v-if="showAvatar"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-xs text-blue-800"
        >
          <h5>TC</h5>
        </div>
        <div class="flex items-center justify-between gap-2 flex-grow">
          <InlineInput
            class="cursor-pointer max-w-[100px] text-sm font-normal leading-none text-gray-700"
            :value="userName"
            :multiline="false"
            :edit-by-inline-click="false"
            @inline-input-changed="userNameChanged"
          />
        </div>
      </div>
      <slot name="middle" />
      <div class="w-full border-t border-gray-100" />
      <a
        href="/logout"
        class="block w-full px-4 py-3 text-sm font-normal leading-none text-gray-700 hover:bg-gray-50"
        @click="closeMenu"
      >
        Logout
      </a>
      <slot
        name="appendItems"
        :toggleMenu="toggleMenu"
        :closeMenu="closeMenu"
        :openMenu="openMenu"
      />
    </template>
  </BaseDropDown>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue'
import BaseDropDown from '@/app/components/BaseDropDown.vue'
import UserAvatar from './UserAvatar.vue'
import InlineInput from '@/domain/cards/components/InlineInput.vue'
import { useUserStore } from '@/app/services/useUserStore.js'
import { storeToRefs } from 'pinia'

export const componentName = 'ProfileMenu'
export default defineComponent({
  name: componentName,
  components: {
    BaseDropDown,
    UserAvatar,
    InlineInput,
  },
  props: ['showAvatar'],
  setup() {
    const userStore = useUserStore()
    const { userName } = storeToRefs(userStore)

    onBeforeMount(() => {
      userStore.readUserNameFromLocalStorage()
    })

    const userNameChanged = ({ event }) => {
      userStore.updateUserName(event.target.value)
    }
    return {
      componentName,
      userName,
      userNameChanged,
    }
  },
})
</script>
