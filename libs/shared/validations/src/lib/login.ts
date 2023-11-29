import { z } from 'zod'

import type { ZodType } from 'zod'
import type { LoginForm } from '@shared/models'

export const loginValidationSchema: ZodType<LoginForm> = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, { message: 'This field is required' }),
  password: z.string().min(1, { message: 'This field is required' }),
})
