import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'

import type { User as UserType } from '@shared/models'

export type UserModel = UserType & {
  checkPassword: (password: string) => Promise<boolean>
}

@ObjectType()
@Schema({ timestamps: true })
export class User implements UserModel {
  @Field(() => String)
  _id!: string

  @Field(() => String)
  @Prop()
  avatar!: string

  @Field(() => String)
  @Prop()
  email!: string

  @Field(() => String)
  @Prop()
  username!: string

  @Field(() => String)
  @Prop()
  first_name!: string

  @Field(() => String)
  @Prop()
  last_name!: string

  @Field(() => String)
  @Prop()
  password!: string

  @Field(() => String)
  @Prop()
  createdAt!: string

  checkPassword!: (password: string) => Promise<boolean>
}
