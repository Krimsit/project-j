import { z } from 'zod'

import type { ZodType } from 'zod'
import type { LoginForm, RegistrationForm } from '@shared/models'

export const loginValidationSchema: ZodType<LoginForm> = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, { message: 'This field is required' }),
  password: z.string().min(1, { message: 'This field is required' }),
})

export const registrationValidationSchema: ZodType<RegistrationForm> = z.object(
  {
    avatar: z
      .object({
        base64: z.string(),
        filename: z.string(),
      })
      .strict({ message: 'This field is required' }),
    email: z
      .string()
      .email('Invalid email')
      .min(1, { message: 'This field is required' }),
    username: z.string().min(1, { message: 'This field is required' }),
    first_name: z.string().min(1, { message: 'This field is required' }),
    last_name: z.string().min(1, { message: 'This field is required' }),
    password: z.string().min(1, { message: 'This field is required' }),
  },
)
