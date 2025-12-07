<script setup lang="ts">
import { useTheme } from '~/shared/ui'

const { isDark } = useTheme()
</script>

<template>
  <img
    :src="`/img/logo-${isDark ? 'white' : 'black'}.svg`"
    alt="logo"
    class="size-6"
  />
</template>
