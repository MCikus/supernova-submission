import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import PCard from '@/domain/cards/components/PCard.vue'
import PTopic from '@/domain/cards/components/PTopic.vue'
import DemoHome from '@/domain/demo/components/DemoHome.vue'
import DemoDataManager from '@/domain/dataManager/DemoDataManager.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: PCard,
  },
  {
    path: '/topic/:titleCardId',
    name: 'Topic',
    component: PTopic,
  },
  {
    path: '/__canister-demo',
    name: 'DemoHome',
    component: DemoHome,
  },
  {
    path: '/__data-manager',
    name: 'DemoDataManager',
    component: DemoDataManager,
  },
]

if (import.meta.env.DEV === true) {
  routes.push({
    path: '/playground/CardListingForATopic',
    name: 'CardTitle',
    component: () =>
      import('../../domain/cards/components/playground_CardTopicPreviewComponent.vue'),
  })
}

export { routes }

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
