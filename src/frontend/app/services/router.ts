import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import PCard from '@/app/components/PCard.vue'
import DemoHome from '@/domain/demo/components/DemoHome.vue'
import CallPCardTopicPreviewComponent from '@/domain/cards/components/CallPCardTopicPreviewComponent.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: PCard,
    meta: {
      isMainRoute: true,
    },
  },
  {
    path: '/__canister-demo',
    name: 'DemoHome',
    component: DemoHome,
  },
]

if (import.meta.env.DEV === true) {
  routes.push({
    path: '/playground/CardListingForATopic',
    name: 'CardTitle',
    component: CallPCardTopicPreviewComponent,
    meta: {
      isMainRoute: true,
    },
  })
}

export { routes }

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
