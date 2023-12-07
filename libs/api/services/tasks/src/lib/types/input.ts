import type { Schema as MongooseSchema } from 'mongoose'
import type {
  TaskForm as TaskFormType,
  UpdateTaskAssignerForm as UpdateTaskAssignerFormType,
} from '@shared/models'

export type TaskFormClass = Omit<TaskFormType, 'assigner' | 'project_id'> & {
  assigner: MongooseSchema.Types.ObjectId
  project_id: MongooseSchema.Types.ObjectId
}

export type UpdateTaskAssignerFormClass = Omit<
  UpdateTaskAssignerFormType,
  'assigner'
> & {
  assigner: MongooseSchema.Types.ObjectId
}
