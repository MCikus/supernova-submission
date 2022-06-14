<template>
  <div class="fixed top-[72px] right-2 z-50 max-h-[80vh] w-full max-w-[364px]">
    <TransitionGroup name="list">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </TransitionGroup>
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
