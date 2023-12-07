import type { Schema as MongooseSchema } from 'mongoose'
import type {
  ProjectForm as ProjectFormType,
  UpdateProjectUsersForm as UpdateUsersFormType,
} from '@shared/models'

export type ProjectFormClass = Omit<ProjectFormType, 'users'> & {
  users: MongooseSchema.Types.ObjectId[]
}

export type UpdateProjectUsersFormClass = Omit<UpdateUsersFormType, 'users'> & {
  users: MongooseSchema.Types.ObjectId[]
}
