<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'

import { getProfile, logOut, useAuthStore } from '~/entities/user'
import { Sonner } from '~/shared/ui'

import './styles/global.css'

const authStore = useAuthStore()

const { isError } = useQuery({
  queryKey: ['profile'],
  queryFn: getProfile,
  retry: false,
})

watch(isError, (isError) => {
  if (!isError) return
  logOut()
  authStore.clearUser()
})
</script>

<template>
  <main>
    <RouterView />
  </main>
  <Sonner richColors />
</template>
