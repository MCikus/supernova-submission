<template>
  <BaseNavigationLayout class="relative bg-[#5F75D7]" :class="componentName">
    <template #left>
      <div class="flex w-fit justify-start">
        <a href="/dashboard">
          <MiljnLogo :css-classes="['h-5']" theme="light" />
        </a>
      </div>
    </template>
    <template #right>
      <div class="flex w-auto grow items-center justify-end space-x-6">
        <NavigationActionGroup class="md:flex hidden" />
        <NotificationMenu />
        <SearchInput :value="topicsSearchString" @input="topicsSearchString = $event" />
        <ProfileMenu :showAvatar="true">
          <template #middle>
            <div class="px-3 py-2 flex flex-col items-center">
              <div
                class="border bg-white relative rounded-full animation-pulse w-14 h-14 my-4"
                :class="energyColor"
              ></div>
              <h4 class="font-semibold">{{ MJNE }}</h4>
              <h4>$MJNE</h4>

              <button
                class="
                  bg-indigo-50
                  font-normal
                  text-gray-700
                  px-5
                  py-2
                  rounded-lg
                  mt-4
                  mb-2
                  flex
                  gap-3
                  items-center
                "
              >
                <span>
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.30064 0.0463346C8.71692 0.177555 9 0.563602 9 1.00007V6.00007L13 6.00007C13.3729 6.00007 13.7148 6.20753 13.887 6.53826C14.0592 6.86899 14.0331 7.26806 13.8192 7.57353L6.81924 17.5735C6.56894 17.9311 6.11564 18.085 5.69936 17.9538C5.28309 17.8226 5 17.4365 5 17.0001L5 12.0001H1C0.627127 12.0001 0.285222 11.7926 0.113024 11.4619C-0.0591735 11.1312 -0.0330591 10.7321 0.180771 10.4266L7.18077 0.42661C7.43107 0.0690398 7.88436 -0.0848856 8.30064 0.0463346Z"
                      fill="#6366F1"
                    />
                  </svg>
                </span>
                <span>Recharge $MJNE</span>
              </button>
            </div>
          </template>
        </ProfileMenu>
      </div>
    </template>
  </BaseNavigationLayout>
</template>

<script>
import { computed, defineComponent } from 'vue'
import BaseNavigationLayout from '@/app/components/BaseNavigationLayout.vue'
import ProfileMenu from '@/app/components/ProfileMenu.vue'
import SearchInput from '@/app/components/SearchInput.vue'
import NavigationActionGroup from '@/app/components/NavigationActionGroup.vue'
import MiljnLogo from './MiljnLogo.vue'
import NotificationMenu from '@/app/components/NotificationMenu.vue'
import { useDashboardSearchStore } from '@/app/services/useDashboardSearchStore.js'
import { useEnergyStore } from '@/app/services/useEnergyStore'
import { storeToRefs } from 'pinia'

export const componentName = 'Navigation'

export default defineComponent({
  name: componentName,
  components: {
    BaseNavigationLayout,
    ProfileMenu,
    SearchInput,
    NavigationActionGroup,
    MiljnLogo,
    NotificationMenu,
  },
  setup() {
    const { topicsSearchString } = storeToRefs(useDashboardSearchStore())
    const { energyLevel, $MJNE: MJNE } = storeToRefs(useEnergyStore())
   
    const energyColor = computed(() => {
      let color
      if (energyLevel.value == 'low') color = 'red'
      else if (energyLevel.value == 'medium') color = 'yellow'
      else color = 'green'
      return [`border-${color}-500 before:bg-${color}-500 after:bg-${color}-500`]
    })
    const pulseCount = computed(() => {
      if (energyLevel.value == 'low') return 3
      else if (energyLevel.value == 'medium') return 5
      else return 6
    })

    return {
      componentName,
      topicsSearchString,
      energyColor,
      pulseCount,
      MJNE,
    }
  },
})
</script>

<style scoped>
.animation-pulse:after,
.animation-pulse:before {
  position: absolute;
  content: '';
  height: 110%;
  width: 110%;
  top: 50%;
  left: 50%;
  filter: blur(0.25px);
  transform: translate(-50%, -50%);
  -webkit-animation: anim-pulse 1.5s linear infinite;
  animation: anim-pulse 1.5s linear infinite;
  z-index: -10;
  opacity: 0.5;
  border-radius: 9999px;
}
.animation-pulse:before {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

@keyframes anim-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
  to {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
</style>
