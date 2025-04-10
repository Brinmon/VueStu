import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CardEdit from '../views/CardEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/card/edit',
    name: 'CardEdit',
    component: CardEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router