import { createMemoryHistory, createRouter } from 'vue-router'

import { HomePage } from '~/pages/home'

const routes = [{ path: '/', component: HomePage }]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export { router }
