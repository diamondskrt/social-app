<script setup lang="ts">
import { cn } from '~/shared/lib'
import { Button } from '~/shared/ui'

import { inputGroupButtonVariants } from '../config'
import type { InputGroupButtonProps } from '../model'

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'ghost',
})
</script>

<template>
  <Button
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
