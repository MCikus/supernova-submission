<template>
    <div
        class="relative flex h-screen w-screen flex-col overflow-hidden"
        :class="componentName"
    >
        <div>
            <slot name="navigation" />
        </div>
        <div class="grow">
            <slot name="content" />
        </div>
        <slot name="dialog" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'BaseAppLayout'

export default defineComponent({
    name: componentName,
    setup() {
        return {
            componentName,
        }
    },
})
</script>
