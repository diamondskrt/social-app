<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import { logOut, useAuthStore } from '~/entities/user'
import {
  Sheet,
  SheetContent,
  SheetTitleHidden,
  SheetTrigger,
} from '~/shared/ui'

import { userLinks } from '../config'

const router = useRouter()

const logOutMutation = useMutation({
  mutationFn: logOut,
})

const isOpen = ref(false)
const setIsOpen = (value: boolean) => {
  isOpen.value = value
}

const authStore = useAuthStore()

const onLogOut = async () => {
  try {
    await logOutMutation.mutateAsync()
    authStore.clearUser()
    setIsOpen(false)
    toast.success('Successfully logged out!')
    router.push('/')
  } catch (error) {
    toast.error('My first toast')
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <Sheet :open="isOpen" @update:open="setIsOpen">
    <SheetTrigger>
      <slot />
    </SheetTrigger>
    <SheetContent :aria-describedby="undefined">
      <SheetTitleHidden />

      <div class="flex h-full items-center px-4 py-6">
        <ul>
          <RouterLink
            v-for="link in userLinks"
            :key="link.href"
            :to="link.href"
          >
            <li class="py-1">{{ link.name }}</li>
          </RouterLink>
          <li class="link" @click="onLogOut">Logout</li>
        </ul>
      </div>
    </SheetContent>
  </Sheet>
</template>
