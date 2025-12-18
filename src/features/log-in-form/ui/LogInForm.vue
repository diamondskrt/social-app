<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import { logIn, logInFormSchema, useAuthStore } from '~/entities/user'
import { Button, FormFieldInput, Typography } from '~/shared/ui'

const form = useForm({
  validationSchema: toTypedSchema(logInFormSchema),
})

const logInMutation = useMutation({
  mutationFn: logIn,
})

const authStore = useAuthStore()
const router = useRouter()

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const user = await logInMutation.mutateAsync(values)
    authStore.setUser(user)
    toast.success('Successfully logged in!')
    router.push('/')
  } catch (error) {
    toast.error('My first toast')
    console.error('Login failed:', error)
  }
})
</script>

<template>
  <div class="flex h-full items-center justify-center p-4">
    <form class="w-1/3 space-y-6" @submit="onSubmit">
      <Typography variant="h4" class="text-center">Sign in</Typography>
      <FormFieldInput label="Email" field-name="email" />
      <FormFieldInput label="Password" field-name="password" type="password" />
      <Button type="submit">Submit</Button>
      <Typography variant="p">
        Don't have an account?
        <RouterLink to="/auth/sign-up" class="underline">Sign up</RouterLink>
      </Typography>
    </form>
  </div>
</template>
