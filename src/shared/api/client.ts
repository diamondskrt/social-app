import { ofetch } from 'ofetch'

// import { useAuthStore } from '~/entities/user'

const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: 'include',
  // onRequest({ options }) {
  //   const authStore = useAuthStore()
  //   const headers = new Headers(options.headers)

  //   if (authStore.accessToken) {
  //     headers.set('Authorization', `Bearer ${authStore.accessToken}`)
  //   }

  //   options.headers = headers
  // },
})

export { api }
