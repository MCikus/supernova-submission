import { defineStore } from 'pinia'

export const useEnergyStore = defineStore('energyStore', {
  state: () => ({
    $MJNE: 1212123,
  }),
  getters: {
    energyLevel: (state) => {
      const val = state.$MJNE
      if (val >= 1212123) return 'high'
      else if (val >= 12121) return 'medium'
      else return 'low'
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
