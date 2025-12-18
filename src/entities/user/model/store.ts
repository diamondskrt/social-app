import { defineStore } from 'pinia'

import type { User } from './types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  persist: true,

  getters: {
    isAuthenticated: (s) => Boolean(s.user),
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
