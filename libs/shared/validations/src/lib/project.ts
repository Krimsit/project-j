import { z } from 'zod'

import type { ZodType } from 'zod'
import type { ProjectForm } from '@shared/models'

export const projectValidationSchema: ZodType<ProjectForm> = z.object({
  image: z
    .object({
      base64: z.string(),
      filename: z.string().optional(),
    })
    .strict({ message: 'This field is required' }),
  name: z.string().min(1, { message: 'This field is required' }),
  users: z.string().array(),
})
