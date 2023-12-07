import type { Schema as MongooseSchema } from 'mongoose'
import type { TaskCommentForm as TaskCommentFormType } from '@shared/models'

export type TaskCommentFormClass = Omit<
  TaskCommentFormType,
  'task_id' | 'user_id'
> & {
  task_id: MongooseSchema.Types.ObjectId
  user_id: MongooseSchema.Types.ObjectId
}
