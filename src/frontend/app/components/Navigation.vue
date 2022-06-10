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
        <button @click="openCreateNewTopicDialog" class="py-2 px-4 rounded-md bg-indigo-50 text-indigo-700 text-sm border shadow-sm border-transparent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-50 focus:ring-offset-2 focus:ring-offset-[#5F75D7]">
          <span class="flex flex-nowrap items-center"><PlusIcon class="h-5 w-5 mr-2"/> New Topic</span>
        </button>
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
import { PlusIcon } from "@heroicons/vue/outline"
import ProfileMenu from '@/app/components/ProfileMenu.vue'
import SearchInput from '@/app/components/SearchInput.vue'
import NavigationActionGroup from '@/app/components/NavigationActionGroup.vue'
import MiljnLogo from './MiljnLogo.vue'
import NotificationMenu from '@/app/components/NotificationMenu.vue'
import { useDashboardSearchStore } from '@/app/services/useDashboardSearchStore.js'
import { useCreateNewTopicDialogStore } from "@/domain/createTopic/services/useCreateNewTopicDialogStore.js"
import { storeToRefs } from 'pinia'

export const componentName = 'Navigation'

export default defineComponent({
  name: componentName,
  components: {
    BaseNavigationLayout,
    PlusIcon,
    ProfileMenu,
    SearchInput,
    NavigationActionGroup,
    MiljnLogo,
    NotificationMenu,
  },
  setup() {
    const {  open: openCreateNewTopicDialog } = useCreateNewTopicDialogStore()

    const { topicsSearchString } = storeToRefs(useDashboardSearchStore())
    return {
      componentName,
      openCreateNewTopicDialog,
      topicsSearchString,
    }
  },
})
</script>

<style scoped></style>
