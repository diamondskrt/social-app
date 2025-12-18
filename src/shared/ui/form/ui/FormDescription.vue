<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

import { cn } from '~/shared/lib'

import { useFormField } from '../composables'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>

<template>
  <small
    :id="formDescriptionId"
    data-slot="form-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </small>
</template>
