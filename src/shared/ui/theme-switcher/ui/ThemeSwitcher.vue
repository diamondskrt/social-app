<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { Button } from '~/shared/ui'

import { useTheme } from '../composables'

const { store, isDark, isLight, isAuto, setStore } = useTheme()
</script>

<template>
  <div class="inline-flex gap-1 rounded-full border px-1 py-0.5">
    <Button
      @click="setStore('dark')"
      variant="ghost"
      size="icon-sm"
      class="rounded-full"
      :class="{ 'bg-accent': isDark }"
    >
      <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem]" />
    </Button>
    <Button
      @click="store = 'auto'"
      variant="ghost"
      size="icon-sm"
      class="rounded-full"
      :class="{ 'bg-accent': isAuto }"
    >
      <Icon icon="radix-icons:desktop" class="h-[1.2rem] w-[1.2rem]" />
    </Button>
    <Button
      @click="store = 'light'"
      variant="ghost"
      size="icon-sm"
      class="rounded-full"
      :class="{ 'bg-accent': isLight }"
    >
      <Icon icon="radix-icons:sun" class="h-[1.2rem] w-[1.2rem]" />
    </Button>
  </div>
</template>
