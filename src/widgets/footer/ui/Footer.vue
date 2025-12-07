<script setup lang="ts">
import { ThemeSwitcher, Typography } from '~/shared/ui'
</script>

<template>
  <div
    class="bg-background z-low fixed bottom-0 left-0 flex h-16 w-full items-center justify-between px-2 py-2 shadow"
  >
    <Typography variant="small" class="text-muted-foreground">
      © 2025 Social App. All rights reserved.
    </Typography>
    <ThemeSwitcher />
  </div>
</template>
