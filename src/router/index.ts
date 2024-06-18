import { createRouter, createWebHistory } from 'vue-router';
import WeatherEntry from '@/components/WeatherEntry.vue';
import WeatherStartPage from '@/components/WeatherStartPage.vue';

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
  ]
})

export default router;
