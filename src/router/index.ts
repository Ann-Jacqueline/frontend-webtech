import { createRouter, createWebHistory } from 'vue-router';
import CityEntryWithRestData from '@/components/CityEntryWithRestData.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CityEntryWithRestData,
  },
  // Weitere Routen können hier hinzugefügt werden
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
