<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetTitleHidden,
  SheetTrigger,
} from '~/shared/ui'

import { userLinks } from '../config'
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <slot />
    </SheetTrigger>
    <SheetContent :aria-describedby="undefined">
      <SheetTitleHidden />

      <div class="flex h-full items-center px-4 py-6">
        <ul>
          <RouterLink
            v-for="link in userLinks"
            :key="link.href"
            :to="link.href"
          >
            <li class="py-1">{{ link.name }}</li>
          </RouterLink>
        </ul>
      </div>
    </SheetContent>
  </Sheet>
</template>
