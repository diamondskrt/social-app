import type z from 'zod'

import type { logInFormSchema, signUpFormSchema } from '../config'

type User = {
  id: string
  userName: string
  email: string
  profileImageUrl?: string
}

type SignUpFormValues = z.infer<typeof signUpFormSchema>

type logInFormValues = z.infer<typeof logInFormSchema>

export type { User, SignUpFormValues, logInFormValues }
