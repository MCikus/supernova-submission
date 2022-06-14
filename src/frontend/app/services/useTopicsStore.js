import { defineStore } from 'pinia'

export const useTopicsStore = defineStore('useTopicsStore', {
  state: () => ({
    topics: [
      {
        id: '867907c9-018a-44b6-961d-a272dd91b425',
        title: 'Become a Miljn frontend developer',
        meta: {
          priority: 1,
          progress: 'in_progress',
        },
      },
    ],
  }),
  actions: {
    addNewTopic(topicName) {
      this.topics.push({
        title: topicName,
      })
    },
  },
})
