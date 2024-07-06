import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const defaultValues = {
  username: '',
  email: '',
  password: '',
};
