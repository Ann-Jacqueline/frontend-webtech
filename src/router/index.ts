import { createRouter, createWebHistory } from 'vue-router'
import CityEntryWithOptionsAPIView from '@/views/CityEntryWithOptionsAPIView.vue'
import CityEntryWithRestDataView from '@/views/CityEntryWithRestDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cities-oa',
      name: 'cities-oa',
      component: CityEntryWithOptionsAPIView
    },
    {
      path: '/cities-rest-api',
      name: 'cities-rest-api',
      component: CityEntryWithRestDataView
    }
  ]
})
export default router
