import { createRouter, createWebHistory } from 'vue-router'
import Wish from '../views/wish/index.vue'
import GoWish from '../views/goWish/index.vue'
import WishResult from '../views/wishResult/index.vue'
import History from '../views/history/index.vue'
import Detail from '../views/detail/index.vue'
import Analysis from '../views/analysis/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/wish'
  },
  {
    path: '/wish',
    name: 'wish',
    component: Wish
  },
  {
    path: '/goWish',
    name: 'goWish',
    component: GoWish
  },
  {
    path: '/wishResult',
    name: 'wishResult',
    component: WishResult
  },
  {
    path: '/history',
    name: 'history',
    component: History
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: Analysis
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
