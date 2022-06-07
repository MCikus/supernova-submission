<template>
    <div class="border-box p-2">
        <div
            :id="componentData.id"
            tabindex="0"
            class="focus:outline-none group flex cursor-pointer items-center justify-center rounded-lg focus:ring-4 focus:ring-opacity-30 focus:ring-offset-0"
            :class="[computedCardColor, computedCardSize, $options.name]"
            role="button"
            @click.stop="handleClick($event)"
        >
            <div class="flex items-center justify-center">
                <span
                    tabindex="0"
                    class="focus:outline-none inline-flex rounded-angularness p-1.5 text-base-300 drop-shadow filter focus-visible:ring-2 focus-visible:ring-neutral-focus group-hover:text-primary-focus"
                    :class="[...computedDisabledCss]"
                >
                    <PPlusIcon
                        :is-disabled="isDisabled"
                        :css-classes="[
                            'h-14',
                            'w-14',
                            '-m-3.5',
                            'md:h-10',
                            'md:w-10',
                            'md:-m-2.5',
                        ]"
                    />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import PPlusIcon from '../../../app/components/PPlusIcon.vue'

export default defineComponent({
    name: 'ACreateCardButton',
    components: {
        PPlusIcon,
    },
    props: {
        componentData: {
            type: Object,
            default: () => ({
                id: null,
            }),
        },
        isChild: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['a-create-card-button-clicked'],
    computed: {
        computedDisabledCss() {
            return this.isDisabled ? ['text-base-200', 'pointer-events-none'] : []
        },
        computedCardColor() {
            if (this.isChild) {
                return 'bg-primary-content bg-transparent border-2 border-primary focus:ring-[#FF1493] focus:ring-offset-primary-content'
            }
            return 'bg-transparent border-2 border-primary-content focus:ring-[#FF1493] focus:ring-offset-primary hover:bg-primary-content'
        },
        computedCardSize() {
            if (this.isChild) {
                return 'min-w-full w-full h-[11rem] sm:min-w-[20rem] sm:w-[20rem]'
            }
            return 'min-w-[20rem] w-[20rem] h-[11rem]'
        },
    },
    methods: {
        handleClick(event) {
            if (this.isDisabled) {
                return
            }
            this.$emit('a-create-card-button-clicked', {
                componentName: this.$options.name,
                event: event,
            })
        },
    },
})
</script>

<style scoped></style>
