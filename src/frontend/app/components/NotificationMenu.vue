<template>
  <BaseDropDown :class="componentName" @closed="markAllNotificationsAsRead()">
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
    <template #items="{ closeMenu }">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        @click="closeMenu"
      >
        <div
          class="relative block w-full truncate py-3 pl-6 pr-4 text-sm font-normal leading-none text-base-700 hover:bg-base-200"
        >
          {{ notification.title }}
          <span
            v-if="!notification.markAsRead"
            class="absolute top-1/2 left-2 flex h-2 w-2 -translate-y-1/2 items-center justify-center rounded-full bg-state-warning"
          ></span>
        </div>
        <div class="w-full border-t border-gray-100" />
      </div>
    </template>
  </BaseDropDown>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from 'vue'
import BaseDropDown from '@/app/components/BaseDropDown.vue'
import { BellIcon } from '@heroicons/vue/outline'
import { useNotificationsStore } from '@/app/services/useNotificationsStore.js'
import { storeToRefs } from 'pinia'

export const componentName = 'NotificationMenu'
export default defineComponent({
  name: componentName,
  components: {
    BaseDropDown,
    BellIcon,
  },
  setup() {
    const notificationStore = useNotificationsStore()
    const { notifications } = storeToRefs(notificationStore)
    const unreadNotifications = computed(() => {
      return (
        notifications?.value?.filter(
          (notification) => notification.markAsRead === false,
        ) ?? []
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
