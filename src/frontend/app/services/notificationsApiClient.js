/*import httpClient from '@/app/services/httpClient.js'
import { notifications } from '@/app/services/miljnApiEndpoints.js'*/

// @todo: handle Errors

export const allNotifications = async () => {
    return [
        {
            id: 'uuid1',
            title: 'Your topic has been updated',
            timestamp: '',
            markAsRead: false,
        },
        {
            id: 'uuid2',
            title: 'Your user name has been updated',
            timestamp: '',
            markAsRead: false,
        },
    ]
    // return (await httpClient.get(notifications.index))?.data?.data ?? []
}

export const updateNotification = async (notification) => {
    console.error('Updating notifications is not implemented yet: ', notification)
    // return (await httpClient.put(notifications.modify(notification.id), JSON.stringify(notification)))?.data?.data ?? []
}

export default {
    allNotifications,
    updateNotification,
}
