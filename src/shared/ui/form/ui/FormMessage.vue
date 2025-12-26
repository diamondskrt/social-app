<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import type { HTMLAttributes } from 'vue'
import { toValue } from 'vue'

import { cn } from '~/shared/lib'

import { useFormField } from '../composables'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    data-slot="form-message"
    as="small"
    :name="toValue(name)"
    :class="cn('text-destructive text-sm', props.class)"
  />
</template>
