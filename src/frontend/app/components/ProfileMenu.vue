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
            <div class="flex cursor-text hover:bg-gray-50">
                <InlineInput
                    class="w-full cursor-pointer px-4 py-3 text-sm font-normal leading-none text-gray-700"
                    :value="userName"
                    :multiline="false"
                    :edit-by-inline-click="false"
                    @inline-input-changed="userNameChanged"
                />
            </div>
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
