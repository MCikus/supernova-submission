<template>
  <div class="fixed top-[72px] right-2 z-50 max-h-[80vh] w-full max-w-[364px]">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationsStore } from '@/domain/notifications/services/useNotificationsStore'
import Notification from './Notification.vue'

export const componentName = 'NotificationStack'

export default defineComponent({
  name: componentName,
  components: { Notification },
  setup() {
    const notificationStore = useNotificationsStore()

    const { notifications } = storeToRefs(notificationStore)

    return {
      notifications,
    }
  },
})
</script>
