<template>
  <div class="fixed max-w-[364px] w-full top-[72px] right-2 max-h-[80vh] z-50">
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
import { useNotificationsStore } from '@/app/services/useNotificationsStore'
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
