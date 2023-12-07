import { Field, InputType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

import type { TaskCommentFormClass } from '../types'

@InputType()
export class TaskCommentForm implements TaskCommentFormClass {
  @Field(() => String)
  task_id!: MongooseSchema.Types.ObjectId

  @Field(() => String)
  user_id!: MongooseSchema.Types.ObjectId

  @Field(() => String)
  message!: string
}
