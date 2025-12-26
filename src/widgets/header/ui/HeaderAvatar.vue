<script setup lang="ts">
import { useAuthStore } from '~/entities/user'
import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui'

const authStore = useAuthStore()
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>{{ authStore.user?.userName ?? 'CN' }}</AvatarFallback>
  </Avatar>
</template>
