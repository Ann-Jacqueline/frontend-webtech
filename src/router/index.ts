import { createRouter, createWebHistory } from 'vue-router';
import WeatherEntry from '@/components/WeatherEntry.vue';
import UserAccount from '@/components/WeatherAccountManager.vue';
import WeatherStartPage from '@/components/WeatherStartPage.vue';
import WeatherRecommendations from '@/components/WeatherRecommendations.vue';



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
    {
      path: '/recommendations',
      name: 'Recommendations',
      component: WeatherRecommendations
    }
  ]
})

export default router;