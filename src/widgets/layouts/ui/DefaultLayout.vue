<script setup lang="ts">
import { Footer } from '~/widgets/footer'
import { Header } from '~/widgets/header'
</script>

<template>
  <div class="flex h-screen flex-col">
    <Header />
    <!-- header height is h-16 -->
    <div class="flex-1 pt-16">
      <slot />
    </div>
    <Footer />
  </div>
</template>
