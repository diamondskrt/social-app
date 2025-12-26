import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(6, 'The password is too short')
  .refine(
    (val) =>
      /[a-z]/.test(val) &&
      /[A-Z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[^a-zA-Z0-9]/.test(val),
    {
      message:
        'The password must contain an uppercase, lowercase letter, a number, and a special character.',
    }
  )

const signUpFormSchema = z
  .object({
    userName: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email('Invalid email'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: `Passwords don't match`,
  })

const logInFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: passwordSchema,
})

export { signUpFormSchema, logInFormSchema }
