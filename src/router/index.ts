// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import WeatherSearch from '../components/WeatherSearch.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WeatherSearch
    },
  ]
})

export default router;

