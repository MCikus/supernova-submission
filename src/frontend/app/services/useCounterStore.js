import { defineStore } from 'pinia'
import { counter } from "canisters/counter"

export const useCounterStore = defineStore('useCounterStore', {
    state: () => ({
        count: '0',
    }),
    actions: {
        async refreshCounter() {
            const res = await counter.getValue()
            this.count = res.toString()
        },
        async increment() {
            await counter.increment()
            await this.refreshCounter()
        }
    }
})
