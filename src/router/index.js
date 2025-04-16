import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import AdminView from '../views/AdminView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
