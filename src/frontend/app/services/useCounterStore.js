import { defineStore } from 'pinia'
import { counter } from "canisters/counter"

export const useCounterStore = defineStore('useCounterStore', {
    state: () => ({
        count: 0n,
    }),
    actions: {
        async refreshCounter() {
            const res = await counter.getValue()
            this.count = res
        },
        async increment() {
            this.count = 1n + this.count
            await counter.increment()
            await this.refreshCounter()
        }
    }
})
