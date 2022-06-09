import { defineStore } from 'pinia'
import {
  allNotifications,
  updateNotification,
} from '@/app/services/notificationsApiClient.js'
import { log } from '@/app/services/errorService.js'

export const useNotificationsStore = defineStore('notificationsStore', {
  state: () => ({
    notifications: null,
  }),
  actions: {
    async getAllNotifications() {
      try {
        this.notifications = await allNotifications()
      } catch (e) {
        log(e)
      }
    },
    async markNotificationAsRead(notificationId) {
      const readNotification = this.notifications.find(
        (notification) => notification.id === notificationId,
      )
      readNotification.markAsRead = true

      try {
        await updateNotification(readNotification)
      } catch (e) {
        log(e)
      }
    },
  },
})
