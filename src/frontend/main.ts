import { createApp } from 'vue'
import App from '@/app/components/App.vue'
import './tailwind.css'
import { createPinia } from 'pinia'
import { router } from '@/app/services/router'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#root')
