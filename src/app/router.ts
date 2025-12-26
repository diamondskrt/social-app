import { createRouter, createWebHistory } from 'vue-router'

import { LogIn, SignUp } from '~/pages/auth'
import { HomePage } from '~/pages/home'
import { AuthLayout } from '~/widgets/layouts'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children: [
      { path: 'sign-in', name: 'sign-in', component: LogIn },
      { path: 'sign-up', name: 'sign-up', component: SignUp },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
