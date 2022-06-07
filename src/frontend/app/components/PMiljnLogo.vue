<template>
    <svg
        v-if="theme === 'dark'"
        :class="[...computedLogoSizesCss, ...cssClasses, ...[$options.name, 'dark']]"
        viewBox="0 0 166 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 30V0H3.89933L13.9262 20H14.4832L24.5101 0H28.4094V30H23.953V8.88889L15.5973 25.5556H12.8121L3.89933 8.88889V30H0Z"
            fill="#212838"
        />
        <path d="M50.6913 30V0H54.5906V30H50.6913Z" fill="#212838" />
        <path
            d="M79.6577 22.2222V0H83.557V21.1111C83.557 26.3889 87.4564 26.6667 90.2416 26.6667V30C84.1141 30 79.6577 28.3333 79.6577 22.2222Z"
            fill="#212838"
        />
        <path
            d="M119.765 22.2222V0H115.866V21.1111C115.866 26.3889 111.966 26.6667 109.181 26.6667V30C115.309 30 119.765 28.3333 119.765 22.2222Z"
            fill="#212838"
        />
        <path
            d="M142.604 30V0H146.503L161.544 22.2222H162.101V0H166V30H162.658L146.503 6.66667V30H142.604Z"
            fill="#212838"
        />
    </svg>

    <svg
        v-if="theme === 'light'"
        :class="[...computedLogoSizesCss, ...cssClasses, ...[$options.name, 'light']]"
        viewBox="0 0 166 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 30V0H3.89933L13.9262 20H14.4832L24.5101 0H28.4094V30H23.953V8.88889L15.5973 25.5556H12.8121L3.89933 8.88889V30H0Z"
            fill="white"
        />
        <path d="M50.6913 30V0H54.5906V30H50.6913Z" fill="white" />
        <path
            d="M79.6577 22.2222V0H83.557V21.1111C83.557 26.3889 87.4564 26.6667 90.2416 26.6667V30C84.1141 30 79.6577 28.3333 79.6577 22.2222Z"
            fill="white"
        />
        <path
            d="M119.765 22.2222V0H115.866V21.1111C115.866 26.3889 111.966 26.6667 109.181 26.6667V30C115.309 30 119.765 28.3333 119.765 22.2222Z"
            fill="white"
        />
        <path
            d="M142.604 30V0H146.503L161.544 22.2222H162.101V0H166V30H162.658L146.503 6.66667V30H142.604Z"
            fill="white"
        />
    </svg>
</template>

<script>
import { defineComponent } from 'vue'
import get from 'lodash/get'

const logoSizes = {
    DEFAULT: ['h-6'],
    md: ['h-8'],
    base: ['h-6'],
}

export default defineComponent({
    name: 'PMiljnLogo',
    props: {
        size: {
            type: String,
            default: 'base',
            validator(value) {
                return ['base', 'md'].includes(value)
            },
        },
        theme: {
            type: String,
            default: 'dark',
            validator(value) {
                return ['dark', 'light'].includes(value)
            },
        },
        cssClasses: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        computedLogoSizesCss() {
            if (this.cssClasses && this.cssClasses.length > 0) {
                return []
            }
            return get(logoSizes, this.size, logoSizes.DEFAULT)
        },
    },
})
</script>

<style scoped></style>
