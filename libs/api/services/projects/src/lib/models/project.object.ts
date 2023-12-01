import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@api/user'
import { Schema as MongooseSchema } from 'mongoose'

import type { Document } from 'mongoose'
import type { Project as ProjectType } from '@shared/models'

@ObjectType()
@Schema({ timestamps: true })
export class Project implements ProjectType {
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

export type ProjectDocument = Document & Project

export const ProjectSchema = SchemaFactory.createForClass<Project>(Project)
