<template>
    <div ref="menuRef" class="relative inline-flex" :class="componentName">
        <slot
            name="menuButton"
            :toggleMenu="toggleMenu"
            :closeMenu="closeMenu"
            :openMenu="openMenu"
        >
            <button
                class="focus:outline-none flex items-center rounded-sm p-1 text-primary hover:text-primary-focus focus:ring-2 focus:ring-primary-focus focus:ring-offset-2"
                @click="toggleMenu"
            >
                <span class="sr-only">Open options</span>
                <slot name="buttonContent">
                    <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                </slot>
            </button>
        </slot>
        <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-if="isMenuVisible"
                class="focus:outline-none absolute right-0 -bottom-2 z-50 w-56 translate-y-full cursor-pointer overflow-hidden rounded-md bg-white shadow-lg"
            >
                <slot
                    name="items"
                    :toggleMenu="toggleMenu"
                    :closeMenu="closeMenu"
                    :openMenu="openMenu"
                >
                    Menu items appear here
                </slot>
            </div>
        </Transition>
    </div>
</template>

<script>
import { DotsVerticalIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export const componentName = 'BaseDropDown'
export default {
    name: componentName,
    components: {
        DotsVerticalIcon,
    },
    emits: ['opened', 'closed'],
    setup(props, { emit }) {
        const menuRef = ref(null)
        const isMenuVisible = ref(false)

        const toggleMenu = () => {
            isMenuVisible.value = !isMenuVisible.value
            isMenuVisible.value ? emit('opened') : emit('closed')
        }

        const closeMenu = () => {
            if (isMenuVisible.value) {
                isMenuVisible.value = false
                emit('closed')
            }
        }

        const openMenu = () => {
            if (!isMenuVisible.value) {
                isMenuVisible.value = true
                emit('opened')
            }
        }

        onClickOutside(menuRef, () => closeMenu())

        return {
            menuRef,
            toggleMenu,
            openMenu,
            closeMenu,
            componentName,
            isMenuVisible,
        }
    },
}
</script>
