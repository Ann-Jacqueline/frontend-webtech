import { createRouter, createWebHistory } from 'vue-router';
import WeatherEntry from '@/views/WeatherEntry.vue';
import UserAccount from '@/views/WeatherAccountManager.vue';
import WeatherStartPage from '@/views/WeatherStartPage.vue';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WeatherStartPage
    },
    {
      path: '/weather',
      name: 'Weather',
      component: WeatherEntry
    },
    {
      path: '/account',
      name: 'Account',
      component: UserAccount
    },
  ]
})

export default router;