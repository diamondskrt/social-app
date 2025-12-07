<script setup lang="ts">
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'code'
  | 'small'

defineProps<{
  variant: TypographyVariant
}>()
</script>

<template>
  <component :is="variant" v-bind="$attrs">
    <slot />
  </component>
</template>
