/*import httpClient from '@/app/services/httpClient.js'
import { notifications } from '@/app/services/miljnApiEndpoints.js'*/

// @todo: handle Errors

export const allNotifications = async () => {
  return [
    {
      id: 'uuid1',
      message: 'Good news! Your changes to “Become a Miljn Front End Developer” were accepted.',
      timestamp: '',
      isRead: false,
      type: 'info',
    },
    {
      id: 'uuid2',
      message: 'Another has proposed 12 changes to the topic “Becoming a Front End developer”.',
      timestamp: '',
      isRead: false,
      type: 'success',
      action: {
        text: "Review"
      }
    }
  ]
  // return (await httpClient.get(notifications.index))?.data?.data ?? []
}

export const updateNotification = async (notification) => {
  // eslint-disable-next-line no-console
  console.error('Updating notifications is not implemented yet: ', notification)
  // return (await httpClient.put(notifications.modify(notification.id), JSON.stringify(notification)))?.data?.data ?? []
}

export default {
  allNotifications,
  updateNotification,
}
