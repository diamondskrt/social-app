<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { Button } from '~/shared/ui'

import { useTheme } from '../composables'

const { store, isDark, isLight, isAuto, setStore } = useTheme()
</script>

<template>
  <div class="inline-flex gap-1 rounded-full border p-1">
    <Button
      @click="setStore('dark')"
      variant="ghost"
      size="icon-xs"
      class="rounded-full"
      :class="{ 'bg-accent': isDark }"
    >
      <Icon icon="radix-icons:moon" class="size-4" />
    </Button>
    <Button
      @click="store = 'auto'"
      variant="ghost"
      size="icon-xs"
      class="rounded-full"
      :class="{ 'bg-accent': isAuto }"
    >
      <Icon icon="radix-icons:desktop" class="size-4" />
    </Button>
    <Button
      @click="store = 'light'"
      variant="ghost"
      size="icon-xs"
      class="rounded-full"
      :class="{ 'bg-accent': isLight }"
    >
      <Icon icon="radix-icons:sun" class="size-4" />
    </Button>
  </div>
</template>
