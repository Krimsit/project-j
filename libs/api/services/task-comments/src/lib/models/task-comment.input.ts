import { Field, InputType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

import type { TaskCommentForm as TaskCommentFormType } from '@shared/models'

type TaskCommentFormClass = Omit<TaskCommentFormType, 'task_id' | 'user_id'> & {
  task_id: MongooseSchema.Types.ObjectId
  user_id: MongooseSchema.Types.ObjectId
}

@InputType()
export class TaskCommentForm implements TaskCommentFormClass {
  @Field(() => String)
  task_id!: MongooseSchema.Types.ObjectId

  @Field(() => String)
  user_id!: MongooseSchema.Types.ObjectId

  @Field(() => String)
  message!: string
}
