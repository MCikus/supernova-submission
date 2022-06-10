import { defineStore } from 'pinia'

export const useTopicsStore = defineStore('useTopicsStore', {
  state: () => ({
    topics: [],
  }),
  actions: {
    addNewTopic(topicName) {
      this.topics.push({
        title: topicName
      })
    }
  }
})
