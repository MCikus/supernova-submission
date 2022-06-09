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
            const parts = name.value.split(" ")
            const initials = []

            parts.forEach((item) => {
              if (item.length > 0 && item !== "") {
                initials.push(item[0])
              }
            })

            const resultingInitials = []

            resultingInitials.push(initials[0])
            if (initials.length > 1) {
              resultingInitials.push(initials[initials.length - 1])
            }

            return resultingInitials.join("").toUpperCase()
          }

          return "JD"
        })

        return {
            computedInitials,
        }
    },
})
</script>

<style scoped></style>
