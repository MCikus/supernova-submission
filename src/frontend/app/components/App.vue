<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "App",
})
</script>
