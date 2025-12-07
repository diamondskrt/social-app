<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { Button } from '~/shared/ui'

import HeaderAvatar from './HeaderAvatar.vue'
import HeaderSheet from './HeaderSheet.vue'

const user = null // Replace with actual user data logic
</script>

<template>
  <HeaderSheet v-if="user">
    <HeaderAvatar />
  </HeaderSheet>
  <RouterLink v-else to="/">
    <Button>Sign In</Button>
  </RouterLink>
</template>
