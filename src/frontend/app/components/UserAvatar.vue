<template>
  <div class="relative">
    <svg
      class="center z-0"
      width="60"
      height="60"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        fill="none"
        r="10"
        :stroke="energyIntensity.color"
        stroke-width="2"
      >
        <animate
          attributeName="r"
          from="8"
          to="20"
          :dur="energyIntensity.duration"
          begin="0s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          :dur="energyIntensity.duration"
          begin="0s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
    <span
      class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base font-extrabold tracking-normal text-state-info"
      :class="[$options.name]"
    >
      {{ computedInitials }}
    </span>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'
import { low, medium, high, useEnergyStore } from '../services/useEnergyStore'

export const componentName = 'UserAvatar'

export default defineComponent({
  name: componentName,
  props: {
    name: {
      type: String,
      default: () => '',
    },
  },
  setup(props) {
    const { energyLevel } = storeToRefs(useEnergyStore())

    const energyIntensity = computed(() => {
      const states = {
        [low]: {
          color: '#FF364F',
          duration: '1',
        },
        [medium]: {
          color: '#FFC600',
          duration: '1.5',
        },
        [high]: {
          color: '#00D577',
          duration: '3',
        },
      }
      return states[energyLevel.value] ?? states[medium]
    })
    const name = computed(() => props.name)

    const computedInitials = computed(() => {
      if (name.value) {
        const parts = name.value.split(' ')
        const initials = []

        parts.forEach((item) => {
          if (item.length > 0 && item !== '') {
            initials.push(item[0])
          }
        })

        const resultingInitials = []

        resultingInitials.push(initials[0])
        if (initials.length > 1) {
          resultingInitials.push(initials[initials.length - 1])
        }

        return resultingInitials.join('').toUpperCase()
      }

      return 'JD'
    })

    return {
      computedInitials,
      energyIntensity,
    }
  },
})
</script>

<style scoped>
.center {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform;
}
</style>
