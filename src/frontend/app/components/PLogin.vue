<template>
    <TLandingPage
        class="bg-secondary"
        :class="$options.name"
        :component-data="computedComponentData"
        @a-text-input-changed="inputHandler($event)"
        @a-button-clicked="handleClick($event)"
    />
</template>

<script>
import TLandingPage from '@/domain/auth/components/TLandingPage.vue'

export default {
    name: 'PLogin',
    components: {
        TLandingPage,
    },
    data() {
        return {
            header: {
                level: 1,
            },
            loginCard: {
                label: 'E-Mail address',
                type: 'email',
                name: 'email',
                placeholder: 'Your E-Mail address',
                value: '',
                messages: {
                    infoMessage: null,
                    hintMessage: null,
                    errorMessage: null,
                },
            },
        }
    },
    computed: {
        computedComponentData() {
            return {
                header: this.header,
                loginCard: this.loginCard,
            }
        },
    },
    methods: {
        inputHandler() {},
        handleClick() {},
    },
}
</script>

<style scoped></style>
