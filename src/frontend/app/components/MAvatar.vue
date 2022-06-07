<template>
    <AButton
        v-if="computedInitials"
        class="h-9 w-9 rounded-full bg-base-300 px-0 py-0 text-base font-extrabold leading-6 tracking-normal text-state-info hover:bg-base-300"
        :class="[$options.name]"
        @aButtonClicked="handleClick($event)"
    >
        {{ computedInitials }}
    </AButton>
</template>

<script>
import { defineComponent } from 'vue'
import AButton from './AButton.vue'

export default defineComponent({
    name: 'MAvatar',
    components: {
        AButton,
    },
    props: {
        componentData: {
            type: Object,
            default: () => ({
                name: null,
            }),
        },
    },
    emits: ['m-avatar-clicked'],
    computed: {
        computedInitials() {
            if (this.componentData.name) {
                const name = this.componentData.name.split(' ')
                const initials = name.shift().charAt(0) + name.pop().charAt(0)
                return initials.toUpperCase()
            }
            return null
        },
    },
    methods: {
        handleClick(event) {
            this.$emit('m-avatar-clicked', {
                componentName: this.$options.name,
                event: event,
            })
        },
    },
})
</script>

<style scoped></style>
