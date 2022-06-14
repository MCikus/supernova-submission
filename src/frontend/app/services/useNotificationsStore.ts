import { defineStore } from 'pinia'
import {
  allNotifications,
  updateNotification,
} from '@/app/services/notificationsApiClient.js'
import { log } from '@/app/services/errorService.js'

export type NotificationProps = {
  id: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  isRead: boolean
  timestamp: string
  action?: {
    text: string
    action: () => void
  }
}

type NotificationStoreState = {
  notifications: NotificationProps[]
}

export const useNotificationsStore = defineStore('notificationsStore', {
  state: () =>
    ({
      notifications: [],
    } as NotificationStoreState),
  actions: {
    async getAllNotifications() {
      try {
        this.notifications = (await allNotifications()) as NotificationProps[]
      } catch (e) {
        log(e)
      }
    },
    async markNotificationAsRead(notificationId: string) {
      const index = this.findIndexById(notificationId)
      if (!index) return
      this.notifications[index].isRead = true

      try {
        await updateNotification(this.notifications[index])
      } catch (e) {
        log(e)
      }
    },
    removeNotification(notificationId: string) {
      const index = this.findIndexById(notificationId)
      if (!index) return

      this.notifications.splice(index, 1)
    },

    findIndexById(id: string) {
      return this.notifications.findIndex((item) => item.id === id)
    },
  },
})
