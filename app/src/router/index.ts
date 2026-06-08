import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppView from '../App.vue'
import FishView from '../views/FishView.vue'
import SignUp from '../views/SignUp.vue'
import CaughtFishView from '@/views/CaughtFishView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/fishview',
      name: 'fishview',
      component: FishView,
    },
    { path: '/caughtfishview', name: 'caughtfishview', component: CaughtFishView },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
