<template>
  <BaseDropDown
    :class="componentName"
    :has-custom-dropdown="true"
    @closed="markAllNotificationsAsRead()"
  >
    <template #menuButton="{ toggleMenu }">
      <button class="relative" @click="toggleMenu">
        <span class="sr-only">Open options</span>
        <span
          v-if="unreadNotifications.length > 0"
          class="absolute top-0 right-0 flex h-4 w-4 -translate-y-1/3 translate-x-1/4 items-center justify-center rounded-full bg-state-warning text-[10px] leading-none text-base-content"
        >
          {{ unreadNotifications.length }}
        </span>
        <BellIcon class="h-6 w-6 text-white" />
      </button>
    </template>
    <template #items>
      <NotificationStack />
    </template>
  </BaseDropDown>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from 'vue'
import BaseDropDown from '@/app/components/BaseDropDown.vue'
import { BellIcon } from '@heroicons/vue/outline'
import { useNotificationsStore } from '@/app/services/useNotificationsStore'
import { storeToRefs } from 'pinia'
import NotificationStack from '@/domain/notifications/components/NotificationStack.vue'

export const componentName = 'NotificationMenu'
export default defineComponent({
  name: componentName,
  components: {
    BaseDropDown,
    BellIcon,
    NotificationStack,
  },
  setup() {
    const notificationStore = useNotificationsStore()
    const { notifications } = storeToRefs(notificationStore)
    const unreadNotifications = computed(() => {
      return (
        notifications?.value?.filter((notification) => notification.isRead === false) ??
        []
      )
    })

    onBeforeMount(async () => {
      await notificationStore.getAllNotifications()
    })

    const markAllNotificationsAsRead = async () => {
      const promises = unreadNotifications.value.map((notification) => {
        return notificationStore.markNotificationAsRead(notification.id)
      })

      await Promise.all(promises)
    }

    return {
      componentName,
      notifications,
      unreadNotifications,
      markAllNotificationsAsRead,
    }
  },
})
</script>
