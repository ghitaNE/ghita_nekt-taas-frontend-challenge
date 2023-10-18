import { createRouter, createWebHistory } from 'vue-router'
import RepositoriesViewVue from '@/views/RepositoriesView.vue'
import HomeViewVue from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    { path: '/callback', component: RepositoriesViewVue }
  ]
})

export default router
