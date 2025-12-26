<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Field as FormField } from 'vee-validate'
import { type HTMLAttributes, computed, ref } from 'vue'

import { TextField } from '~/shared/ui'

import FormControl from './FormControl.vue'
import FormDescription from './FormDescription.vue'
import FormItem from './FormItem.vue'
import FormLabel from './FormLabel.vue'
import FormMessage from './FormMessage.vue'

const props = withDefaults(
  defineProps<{
    fieldName: string
    label?: string
    placeholder?: string
    description?: string
    type?: string
    className?: HTMLAttributes['class']
  }>(),
  {
    type: 'text',
  }
)

const isPassword = computed(() => props.type === 'password')

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const inputType = computed(() =>
  isPassword.value && isPasswordVisible.value ? 'text' : props.type
)

const passwordIcon = computed(() =>
  isPasswordVisible.value ? 'radix-icons:eye-open' : 'radix-icons:eye-closed'
)
</script>

<template>
  <FormField v-slot="{ componentField }" :name="fieldName">
    <FormItem>
      <FormLabel v-if="label">{{ label }}</FormLabel>
      <FormControl>
        <TextField
          :type="inputType"
          :placeholder="placeholder"
          :class="className"
          v-bind="componentField"
        >
          <template v-if="isPassword" #appendIcon>
            <Icon
              :icon="passwordIcon"
              class="size-4 cursor-pointer"
              @click="togglePasswordVisibility"
            />
          </template>
        </TextField>
      </FormControl>
      <FormDescription v-if="description">{{ description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
