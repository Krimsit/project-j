import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

import type { Document } from 'mongoose'

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id!: MongooseSchema.Types.ObjectId

  @Field(() => String)
  @Prop()
  email!: string

  @Field(() => String)
  @Prop()
  username!: string

  @Field(() => String)
  @Prop()
  password!: string

  @Field(() => String)
  @Prop()
  createdAt!: string
}

export type UserDocument = Document & User
