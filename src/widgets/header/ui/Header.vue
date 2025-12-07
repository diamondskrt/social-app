<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Logo, ThemeSwitcher } from '~/shared/ui'

import { useHideOnScroll } from '../composables'

const { isHidden } = useHideOnScroll()
</script>

<template>
  <header
    :class="[
      'z-low bg-background fixed top-0 left-0 flex h-16 w-full items-center justify-between px-2 py-2 shadow transition-transform duration-300 ease-out',
      isHidden ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <RouterLink to="/">
      <Logo />
    </RouterLink>
    <nav class="space-x-4">
      <RouterLink to="/">For you</RouterLink>
      <RouterLink to="/following">Following</RouterLink>
      <RouterLink to="/ghost-posts">Ghost posts</RouterLink>
    </nav>
    <div>Profile</div>
  </header>
</template>
