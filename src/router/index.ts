import { createRouter, createWebHistory } from 'vue-router';
import WAData from '../components/WAData.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: WAData,
  },
  // Weitere Routen können hier hinzugefügt werden
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
