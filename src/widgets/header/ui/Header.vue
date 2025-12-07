<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Logo, ThemeSwitcher } from '~/shared/ui'

import { useHideOnScroll } from '../composables'
import { navLinks } from '../config'
import HeaderProfile from './HeaderProfile.vue'

const { isHidden } = useHideOnScroll()
</script>

<template>
  <header
    :class="[
      'z-low bg-background fixed top-0 left-0 flex h-16 w-full items-center justify-between px-2 py-2 shadow transition-transform duration-300 ease-out',
      isHidden ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <div class="flex w-1/3">
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </div>
    <nav class="flex w-1/3 justify-center">
      <div class="space-x-4">
        <RouterLink v-for="link in navLinks" :key="link.href" :to="link.href">
          {{ link.name }}
        </RouterLink>
      </div>
    </nav>
    <div class="flex w-1/3 items-center justify-end">
      <div class="flex items-center gap-4">
        <ThemeSwitcher />
        <HeaderProfile />
      </div>
    </div>
  </header>
</template>
