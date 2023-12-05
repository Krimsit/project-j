import { Field, InputType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'
import { TaskPriority, TaskStatus } from '@shared/models'

import type {
  TaskForm as TaskFormType,
  UploadFileProps,
  UpdateTaskAssignerForm as UpdateTaskAssignerFormType,
  UpdateTaskStatusForm as UpdateTaskStatusFormType,
  UpdateTaskAttachmentsForm as UpdateTaskAttachmentsFormType,
} from '@shared/models'

type TaskFormClass = Omit<TaskFormType, 'assigner' | 'project_id'> & {
  assigner: MongooseSchema.Types.ObjectId
  project_id: MongooseSchema.Types.ObjectId
}

type UpdateTaskAssignerFormClass = Omit<
  UpdateTaskAssignerFormType,
  'assigner'
> & {
  assigner: MongooseSchema.Types.ObjectId
}

@InputType()
class TaskUploadFile implements UploadFileProps {
  @Field(() => String)
  base64!: string

  @Field(() => String)
  filename!: string
}

@InputType()
export class TaskForm implements TaskFormClass {
  @Field(() => String)
  project_id!: MongooseSchema.Types.ObjectId

  @Field(() => String)
  name!: string

  @Field(() => String)
  dueData!: string

  @Field(() => String)
  assigner!: MongooseSchema.Types.ObjectId

  @Field(() => Number)
  priority!: TaskPriority

  @Field(() => [TaskUploadFile])
  attachments?: TaskUploadFile[]
}

@InputType()
export class UpdateTaskAssignerForm implements UpdateTaskAssignerFormClass {
  @Field(() => String)
  assigner!: MongooseSchema.Types.ObjectId
}

@InputType()
export class UpdateTaskStatusForm implements UpdateTaskStatusFormType {
  @Field(() => Number)
  status!: TaskStatus
}

@InputType()
export class UpdateTaskAttachmentsForm
  implements UpdateTaskAttachmentsFormType
{
  @Field(() => [TaskUploadFile])
  attachments!: TaskUploadFile[]
}
