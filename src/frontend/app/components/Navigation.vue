<template>
  <BaseNavigationLayout class="relative bg-primary" :class="componentName">
    <template #left>
      <div class="flex w-fit justify-start">
        <a href="/dashboard">
          <MiljnLogo :css-classes="['h-5']" theme="light" />
        </a>
      </div>
    </template>
    <template #right>
      <div class="flex w-auto grow items-center justify-end space-x-6">
        <NavigationActionGroup class="hidden md:flex" />
        <NotificationMenu />
        <SearchInput :value="topicsSearchString" @input="topicsSearchString = $event" />
        <ProfileMenu :show-avatar="true">
          <template #middle>
            <div class="mt-[10px] flex flex-col items-center px-3">
              <div class="mb-4 flex min-h-[114px] items-center justify-center">
                <img :src="energyIntensityIndicator" alt="" />
              </div>
              <h3 class="text-xl font-bold leading-6">{{ energyAmount }}</h3>
              <h2>$MJNE</h2>

              <button
                class="mt-4 mb-4 flex items-center gap-2 rounded-lg bg-primary-200 px-5 py-[10px] text-sm font-normal text-base-700 hover:bg-primary-300"
                @click.stop="rechargeEnergyWithDefaultAmount"
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
import { PlusIcon } from '@heroicons/vue/outline'
import ProfileMenu from '@/app/components/ProfileMenu.vue'
import SearchInput from '@/app/components/SearchInput.vue'
import NavigationActionGroup from '@/app/components/NavigationActionGroup.vue'
import MiljnLogo from './MiljnLogo.vue'
import NotificationMenu from '@/app/components/NotificationMenu.vue'
import { useDashboardSearchStore } from '@/app/services/useDashboardSearchStore.js'
import { useCreateNewTopicDialogStore } from '@/domain/createTopic/services/useCreateNewTopicDialogStore.js'
import { low, medium, high, useEnergyStore } from '@/app/services/useEnergyStore'
import highIndicator from '@/app/assets/indicators/high.svg'
import mediumIndicator from '@/app/assets/indicators/medium.svg'
import lowIndicator from '@/app/assets/indicators/low.svg'
import { storeToRefs } from 'pinia'

export const componentName = 'Navigation'

export default defineComponent({
  name: componentName,
  components: {
    BaseNavigationLayout,
    // eslint-disable-next-line vue/no-unused-components
    PlusIcon,
    ProfileMenu,
    SearchInput,
    NavigationActionGroup,
    MiljnLogo,
    NotificationMenu,
  },
  setup() {
    const { open: openCreateNewTopicDialog } = useCreateNewTopicDialogStore()
    const { topicsSearchString } = storeToRefs(useDashboardSearchStore())

    const energyStore = useEnergyStore()
    const { rechargeEnergyWithDefaultAmount } = energyStore
    const { energyLevel, energyAmount } = storeToRefs(energyStore)

    const energyIntensityIndicator = computed(() => {
      const indicators = {
        [low]: lowIndicator,
        [medium]: mediumIndicator,
        [high]: highIndicator,
      }
      return indicators[energyLevel.value] ?? indicators[medium]
    })

    return {
      componentName,
      openCreateNewTopicDialog,
      topicsSearchString,
      energyIntensityIndicator,
      energyAmount,
      rechargeEnergyWithDefaultAmount,
    }
  },
})
</script>

<style scoped></style>
