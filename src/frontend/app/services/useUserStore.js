import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userName: null,
    }),
    actions: {
        readUserNameFromLocalStorage() {
            if (window?.localStorage?.getItem('userStore')) {
                this.userName =
                    JSON.parse(window.localStorage.getItem('userStore'))?.userName ?? null
            }
        },
        updateUserName(name) {
            this.userName = name
            window.localStorage.setItem(
                'userStore',
                JSON.stringify({
                    userName: name,
                })
            )
        },
    },
})
