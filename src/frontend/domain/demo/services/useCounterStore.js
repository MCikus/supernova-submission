import { defineStore } from 'pinia'
// noinspection NpmUsedModulesInstalled
import { counter } from 'canisters/counter'

export const useCounterStore = defineStore('useCounterStore', {
  state: () => ({
    count: 0n,
  }),
  actions: {
    async refreshCounter() {
      this.count = await counter.getValue()
    },
    async increment() {
      this.count = 1n + this.count
      await counter.increment()
      await this.refreshCounter()
    },
  },
})
