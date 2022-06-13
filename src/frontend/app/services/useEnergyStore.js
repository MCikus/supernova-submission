import { defineStore } from 'pinia'

export const low = Symbol('energy-low')
export const medium = Symbol('energy-medium')
export const high = Symbol('energy-high')

export const EnergyLevel = {
  [low]: 100,
  [medium]: 200,
  [high]: 1000,
}

export const useEnergyStore = defineStore('energyStore', {
  state: () => ({
    energyAmountState: 1212123,
  }),
  getters: {
    energyLevel: (state) => {
      if (state.energyAmountState < EnergyLevel[low]) {
        return low
      }

      if (state.energyAmountState < EnergyLevel[medium]) {
        return medium
      }

      return high
    },
    energyAmount: ( state) => {
      return state.energyAmountState
    }
  },
  actions: {
    readEnergyAmountFromLocalStorage() {
      if (localStorage.getItem('energyStore')) {
        this.energyAmountState = JSON.parse(localStorage.getItem('energyStore'))?.energyState ?? null
      }
    },
    updateEnergyAmount(value) {
      this.energyState = value
      // window.localStorage.setItem(
      //   'energyStore',
      //   JSON.stringify({
      //     energyState: this.energyAmountState,
      //   }),
      // )
    },
  },
})
