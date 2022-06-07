<template>
    <div
        class="flex grow overflow-x-scroll p-2 md:px-4 2xl:px-40"
        :class="[$options.name]"
    >
        <slot name="userCards" />
        <slot name="defaultCard" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'OCardsContainer',
})
</script>

<style scoped></style>
