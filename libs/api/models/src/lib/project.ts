import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

import { User } from './user'

import type { Project as ProjectType } from '@shared/models'

export type ProjectModel = Omit<
  ProjectType,
  'allTasksCount' | 'completedTasksCount'
>

@ObjectType()
@Schema({ timestamps: true })
export class Project implements ProjectModel {
  @Field(() => String)
  _id!: string

  @Field(() => String)
  @Prop()
  image!: string

  @Field(() => String)
  @Prop()
  name!: string

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  users!: User[]

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  owner!: User

  @Field(() => String)
  @Prop()
  createdAt!: string
}
