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
      <div class="mt-2 flex cursor-text items-center gap-2 px-3 py-1 hover:bg-gray-50">
        <div
          v-if="showAvatar"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-200 text-sm font-bold text-blue-800"
        >
          <h5>TC</h5>
        </div>
        <div class="flex flex-grow items-center justify-between gap-2">
          <InlineInput
            class="max-w-[100px] cursor-pointer text-sm font-normal leading-none text-gray-700"
            :value="userName"
            :multiline="false"
            :edit-by-inline-click="false"
            @inline-input-changed="userNameChanged"
          />
        </div>
      </div>
      <slot name="middle" />
      <div class="pb-2">
        <a
          href="/logout"
          class="block w-full px-5 py-3 text-sm font-normal leading-none text-gray-700 hover:bg-gray-50"
          @click="closeMenu"
        >
          Logout
        </a>
      </div>
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
