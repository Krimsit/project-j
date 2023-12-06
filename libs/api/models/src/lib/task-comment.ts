import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

import { User } from './user'
import { Task } from './task'

import type { TaskComment as TaskCommentType } from '@shared/models'

@ObjectType()
@Schema({ timestamps: true })
export class TaskComment implements TaskCommentType {
  @Field(() => String)
  _id!: string

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user!: User

  @Field(() => Task)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Task.name })
  task!: Task

  @Field(() => String)
  @Prop()
  message!: string

  @Field(() => String)
  @Prop()
  createdAt!: string
}
