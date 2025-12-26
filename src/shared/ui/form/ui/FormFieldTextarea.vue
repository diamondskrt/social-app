<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { HTMLAttributes } from 'vue'

import { Textarea } from '~/shared/ui'

import FormControl from './FormControl.vue'
import FormDescription from './FormDescription.vue'
import FormItem from './FormItem.vue'
import FormLabel from './FormLabel.vue'
import FormMessage from './FormMessage.vue'

defineProps<{
  fieldName: string
  label?: string
  placeholder?: string
  description?: string
  className?: HTMLAttributes['class']
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="fieldName">
    <FormItem>
      <FormLabel v-if="label">{{ label }}</FormLabel>
      <FormControl>
        <Textarea
          :placeholder="placeholder"
          :class="className"
          v-bind="componentField"
        />
      </FormControl>
      <FormDescription>{{ description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
