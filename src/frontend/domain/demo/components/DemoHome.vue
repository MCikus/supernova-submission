<template>
  <div class="Home">
    <DemoAuth />

    <div>
      <button class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="increment()">
        Count is: {{ count }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from "vue"
import { useCounterStore } from '@/domain/demo/services/useCounterStore.js'
import DemoAuth from "@/domain/demo/components/DemoAuth.vue"
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: "Home",
  components: {
    DemoAuth,
  },
  setup() {
    const counterStore = useCounterStore()
    const { count } = storeToRefs(counterStore)

    const increment = async () => {
      await counterStore.increment()
    }

    onMounted(counterStore.refreshCounter)

    return { increment, count }

  }
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
