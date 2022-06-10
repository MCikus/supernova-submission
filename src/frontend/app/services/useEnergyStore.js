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
    $MJNE: 2000,
  }),
  getters: {
    energyLevel: (state) => {
      const val = state.$MJNE
      if (val < EnergyLevel[low]) {
        return low
      }
      if (state.$MJNE < EnergyLevel[medium]) {
        return medium
      }
      return high
    },
  },
  actions: {
    readMJNEFromLocalStorage() {
      if (localStorage.getItem('energyStore')) {
        this.$MJNE = JSON.parse(localStorage.getItem('energyStore'))?.$MJNE ?? null
      }
    },
    update$MJNE(name) {
      this.$MJNE = name
      window.localStorage.setItem(
        'energyStore',
        JSON.stringify({
          $MJNE: name,
        }),
      )
    },
  },
})
