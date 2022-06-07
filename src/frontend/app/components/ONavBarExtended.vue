<template>
    <div
        :class="$options.name"
        class="flex items-center justify-between bg-primary px-4 py-2.5 shadow-lg md:px-6 2xl:px-16"
    >
        <a href="/">
            <PMiljnLogo :css-classes="['h-5']" theme="light" />
        </a>
        <MAvatar
            :component-data="componentData"
            @m-avatar-clicked="handleClickAvatar($event)"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import MAvatar from './MAvatar.vue'
import PMiljnLogo from './PMiljnLogo.vue'

export default defineComponent({
    name: 'ONavBarExtended',
    components: {
        PMiljnLogo,
        MAvatar,
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
    methods: {
        handleClickAvatar(event) {
            this.$emit('m-avatar-clicked', {
                componentName: this.$options.name,
                event: event,
            })
        },
    },
})
</script>

<style scoped></style>
