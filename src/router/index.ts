import { createRouter, createWebHistory } from 'vue-router'
import CityEntryWithOptionsAPIView from '@/views/CityEntryWithOptionsAPIView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/App.vue') // oder Sie können Ihre App-Komponente direkt importieren
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/cities-oa',
    name: 'cities-oa',
    component: CityEntryWithOptionsAPIView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
