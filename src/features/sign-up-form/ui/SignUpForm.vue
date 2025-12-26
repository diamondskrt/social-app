<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import { signUp, signUpFormSchema, useAuthStore } from '~/entities/user'
import { Button, FormFieldInput, Typography } from '~/shared/ui'

const form = useForm({
  validationSchema: toTypedSchema(signUpFormSchema),
})

const signUpMutation = useMutation({
  mutationFn: signUp,
})

const authStore = useAuthStore()
const router = useRouter()

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const user = await signUpMutation.mutateAsync(values)
    authStore.setUser(user)
    toast.success('Successfully signed up!')
    router.push('/')
  } catch (error) {
    toast.error('My first toast')
    console.error('Signup failed:', error)
  }
})
</script>

<template>
  <div class="flex h-full items-center justify-center p-4">
    <form class="w-1/3 space-y-4" @submit="onSubmit">
      <Typography variant="h4" class="text-center">Sign up</Typography>
      <FormFieldInput label="Username" field-name="userName" />
      <FormFieldInput label="Email" field-name="email" />
      <FormFieldInput label="Password" field-name="password" type="password" />
      <FormFieldInput
        label="Confirm Password"
        field-name="confirmPassword"
        type="password"
      />
      <Button type="submit">Submit</Button>
      <Typography variant="p">
        Already have an account?
        <RouterLink to="/auth/sign-in" class="underline">Sign in</RouterLink>
      </Typography>
    </form>
  </div>
</template>
