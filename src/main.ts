import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { App, router } from '~/app'

createApp(App).use(router).use(VueQueryPlugin).use(pinia).mount('#app')
