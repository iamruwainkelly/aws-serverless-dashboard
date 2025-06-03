import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ServerlessDashboard from './views/ServerlessDashboard.vue'
import './style.css'

// Router configuration
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: ServerlessDashboard,
    meta: { title: 'AWS Serverless Dashboard' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'AWS Serverless Dashboard'
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
