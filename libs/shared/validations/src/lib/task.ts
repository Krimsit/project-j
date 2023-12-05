import { z } from 'zod'
import { TaskPriority } from '@shared/models'

import type { ZodType } from 'zod'
import type { TaskForm } from '@shared/models'

const taskFilesObject = z.object({
  base64: z.string(),
  filename: z.string().optional(),
})

export const taskValidationSchema: ZodType<TaskForm> = z.object({
  project_id: z.string().min(1, { message: 'This field is required' }),
  name: z.string().min(1, { message: 'This field is required' }),
  dueData: z.string().min(1, { message: 'This field is required' }),
  assigner: z.string().min(1, { message: 'This field is required' }),
  priority: z.nativeEnum(TaskPriority),
  // attachments: z.array(taskFilesObject).min(0),
})
