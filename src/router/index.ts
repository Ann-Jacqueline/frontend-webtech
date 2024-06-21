import WeatherEntry from '@/components/WeatherEntry.vue';
import UserAccount from '@/components/WeatherAccountManager.vue';
import WeatherStartPage from '@/components/WeatherStartPage.vue'; // Angenommen, diese Komponente existiert
// import Settings from '@/components/Settings.vue';
// import WeatherRecommendations from '@/components/WeatherRecommendations.vue';
import { createRouter, createWebHistory } from 'vue-router'


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
    // {
    //   path: '/settings',
    //   name: 'Settings',
    //   component: Settings
    // },
    // {
    //   path: '/recommendations',
    //   name: 'Recommendations',
    //   component: WeatherRecommendations
    // }
  ]
})

export default router;