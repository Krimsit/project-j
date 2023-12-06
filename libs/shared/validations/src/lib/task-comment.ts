import { z } from 'zod'

import type { ZodType } from 'zod'
import type { TaskCommentForm } from '@shared/models'

export const taskCommentValidationSchema: ZodType<TaskCommentForm> = z.object({
  message: z.string().min(1, { message: 'This field is required' }),
  user_id: z.string().min(1, { message: 'This field is required' }),
  task_id: z.string().min(1, { message: 'This field is required' }),
})
