<template>
    <span
        class="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base font-extrabold tracking-normal text-state-info"
        :class="[$options.name]"
    >
        {{ computedInitials }}
    </span>
</template>

<script>
import { computed, defineComponent } from 'vue'

export const componentName = 'UserAvatar'

export default defineComponent({
    name: componentName,
    props: {
        name: {
            type: String,
            default: () => '',
        },
    },
    setup(props) {
        const name = computed(() => props.name)

        const computedInitials = computed(() => {
            if (name.value) {
                const splittedName = name.value.split(' ')
                const initials =
                    splittedName.shift().charAt(0) + splittedName.pop().charAt(0)
                return initials.toUpperCase()
            }
            return null
        })

        return {
            computedInitials,
        }
    },
})
</script>

<style scoped></style>
