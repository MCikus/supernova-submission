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
        <ProfileMenu>
          <template #prependItems="{ closeMenu }">
            <NavigationActionGroup class="md:hidden block" @click="closeMenu" />
          </template>
        </ProfileMenu>
      </div>
    </template>
  </BaseNavigationLayout>
</template>

<script>
import { defineComponent } from 'vue'
import BaseNavigationLayout from '@/app/components/BaseNavigationLayout.vue'
import ProfileMenu from '@/app/components/ProfileMenu.vue'
import SearchInput from '@/app/components/SearchInput.vue'
import NavigationActionGroup from '@/app/components/NavigationActionGroup.vue'
import MiljnLogo from './MiljnLogo.vue'
import NotificationMenu from '@/app/components/NotificationMenu.vue'
import { useDashboardSearchStore } from '@/app/services/useDashboardSearchStore.js'
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
    return {
      componentName,
      topicsSearchString,
    }
  },
})
</script>

<style scoped></style>
