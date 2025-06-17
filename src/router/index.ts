import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/case-study',
      name: 'case-study',
      component: () => import('../views/CaseStudyView.vue'),
      meta: {
        title: 'KeyShot Classic Customer Case Studies - Digital Experience Design',
      },
    },
    {
      path: '/case-studies/keyshot-classic-customer-case-studies',
      name: 'keyshot-case-study',
      component: () => import('../views/CaseStudyView.vue'),
      meta: {
        title: 'KeyShot Classic Customer Case Studies - Digital Experience Design',
      },
    },
  ],
})

export default router
