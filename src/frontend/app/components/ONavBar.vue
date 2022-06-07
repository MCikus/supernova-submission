<template>
    <div
        :class="$options.name"
        class="flex items-center justify-start bg-primary px-4 py-2.5 shadow-lg md:px-6 2xl:px-16"
    >
        <PMiljnLogo :css-classes="['h-5']" theme="light" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import PMiljnLogo from './MiljnLogo.vue'

export default defineComponent({
    name: 'ONavBar',
    components: { PMiljnLogo },
})
</script>

<style scoped></style>
