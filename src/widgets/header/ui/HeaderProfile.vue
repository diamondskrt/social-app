<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useAuthStore } from '~/entities/user'
import { Button } from '~/shared/ui'

import HeaderAvatar from './HeaderAvatar.vue'
import HeaderSheet from './HeaderSheet.vue'

const authStore = useAuthStore()
</script>

<template>
  <HeaderSheet v-if="authStore.user">
    <HeaderAvatar />
  </HeaderSheet>
  <RouterLink v-else to="/auth/sign-in">
    <Button>Sign in</Button>
  </RouterLink>
</template>
