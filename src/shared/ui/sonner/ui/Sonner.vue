<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import type { ToasterProps } from 'vue-sonner'
import { Toaster as Sonner } from 'vue-sonner'

import { cn } from '~/shared/lib'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <Icon icon="radix-icons:check-circled" class="size-4" />
    </template>
    <template #info-icon>
      <Icon icon="radix-icons:info-circled" class="size-4" />
    </template>
    <template #warning-icon>
      <Icon icon="radix-icons:warning" class="size-4" />
    </template>
    <template #error-icon>
      <Icon icon="radix-icons:exclamation-triangle" class="size-4" />
    </template>
    <template #loading-icon>
      <Icon icon="radix-icons:spinner" class="size-4 animate-spin" />
    </template>
    <template #close-icon>
      <Icon icon="radix-icons:x" class="size-4" />
    </template>
  </Sonner>
</template>
