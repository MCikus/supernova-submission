import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/app/components/Home.vue'

const routes = [
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

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
