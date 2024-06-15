import { createRouter, createWebHistory } from 'vue-router';
import WAData from '@/components/WAData.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'Home',
    component: WAData
  },
  // Weitere Routen können hier hinzugefügt werden
]
})

export default router;
