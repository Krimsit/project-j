import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

import { User } from './user'
import { Project } from './project'

import type { Task as TaskType } from '@shared/models'

@ObjectType()
@Schema({ timestamps: true })
export class Task implements TaskType {
  @Field(() => String)
  _id!: string

  @Field(() => String)
  @Prop()
  name!: string

  @Field(() => String)
  @Prop()
  dueData!: string

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  assigner!: User

  @Field(() => Number)
  @Prop()
  priority!: number

  @Field(() => Number)
  @Prop()
  status!: number

  @Field(() => [String])
  @Prop()
  attachments!: string[]

  @Field(() => Project)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Project.name })
  project!: Project

  @Field(() => String)
  @Prop()
  createdAt!: string
}
