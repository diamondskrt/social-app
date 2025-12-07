<script setup lang="ts">
import { Primitive } from 'reka-ui'

import { cn } from '~/shared/lib/utils'

import { buttonVariants } from '../config'
import type { Props } from '../model'

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
