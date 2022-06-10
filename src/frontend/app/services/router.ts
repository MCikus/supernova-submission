import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import PCard from '@/app/components/PCard.vue'
import DemoHome from '@/domain/demo/components/DemoHome.vue'
import DemoDataManager from '@/domain/dataManager/DemoDataManager.vue'

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
  {
    path: '/__data-manager',
    name: 'DemoDataManager',
    component: DemoDataManager,
  },
]

export { routes }

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
