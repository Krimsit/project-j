import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

import type { Document } from 'mongoose'
import type { User as UserType } from '@shared/models'

@ObjectType()
@Schema({ timestamps: true })
export class User implements UserType {
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

export const UserSchema = SchemaFactory.createForClass(User)
