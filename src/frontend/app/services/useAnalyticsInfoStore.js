import { defineStore } from 'pinia'

const useAnalyticsInfoStore = defineStore('SpaceshipsStore', {
  state: () => ({
    isSmartlookInitializedState: false,
    userInfoState: null,
    versionInfoState: null,
    environmentInfoState: null,
  }),
  getters: {
    isSmartlookInitialized(state) {
      return Boolean(
        state.userInfoState && state.versionInfoState && state.environmentInfoState,
      )
    },
    analyticsInformation(state) {
      return {
        user: {
          id: state.userInfoState.id,
          email: state.userInfoState.email,
        },
        version: state.versionInfoState,
        environment: state.environmentInfoState,
      }
    },
  },
  actions: {
    defineUserInfo(user) {
      this.userInfoState = {
        id: user?.id,
        email: user?.email,
      }
    },
    defineVersionInfo(versionInfo) {
      this.versionInfoState = versionInfo
    },
    defineEnvironmentInfo(environmentName) {
      this.environmentInfoState = environmentName
    },
  },
})

export { useAnalyticsInfoStore }
