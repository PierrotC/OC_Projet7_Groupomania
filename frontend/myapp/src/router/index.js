import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  { path: '/home', name: 'home', component: () => import(/* webpackChunkName: "homeview" */"@/views/Home.vue") },
  { path: '/signup', name: 'signup', component: () => import(/* webpackChunkName: "signup" */"@/views/Signup.vue") },
  { path: '/account', name: 'account', component: () => import(/* webpackChunkName: "account" */"@/views/Account.vue") }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
