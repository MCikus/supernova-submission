<template>
  <div class="Home">
    <Auth />
    <Intro />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Intro from "@/app/components/Intro.vue"
import Auth from "@/app/components/Auth.vue"

export default defineComponent({
  name: "Home",
  components: {
    Intro,
    Auth,
  },
})
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-weight: 600;
}

.Home {
  text-align: center;
}
</style>
