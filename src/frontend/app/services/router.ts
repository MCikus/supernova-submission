import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router"

import Home from '@/app/components/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isMainRoute: true,
    },
  },
]

export { routes }

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
