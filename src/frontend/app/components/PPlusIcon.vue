<template>
    <PlusIcon
        v-if="!isDisabled"
        :class="[...computedIconSizesCss, ...cssClasses, ...[$options.name, 'default']]"
    />
    <PlusIcon
        v-if="isDisabled"
        :class="[
            ...computedIconSizesCss,
            ...computedDisabledCss,
            ...cssClasses,
            ...[$options.name, 'disabled'],
        ]"
    />
</template>

<script>
import { defineComponent } from 'vue'
import { PlusIcon } from '@heroicons/vue/outline'
import get from 'lodash/get'

const iconSizes = {
    DEFAULT: ['h-14', 'w-14', '-m-3.5'],
    sm: ['h-10', 'w-10', '-m-2.5'],
    base: ['h-14', 'w-14', '-m-3.5'],
}

export default defineComponent({
    name: 'PPlusIcon',
    components: {
        PlusIcon,
    },
    props: {
        size: {
            type: String,
            default: 'base',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        cssClasses: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        computedIconSizesCss() {
            if (this.cssClasses && this.cssClasses.length > 0) {
                return []
            }
            return get(iconSizes, this.size, iconSizes.DEFAULT)
        },
        computedDisabledCss() {
            return this.isDisabled ? ['text-base-200', 'pointer-events-none'] : []
        },
    },
})
</script>

<style scoped></style>
