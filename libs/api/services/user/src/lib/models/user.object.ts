import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'

import type { Document, Schema as SchemaType } from 'mongoose'
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

export type UserDocument = Document & User

export const UserSchema = SchemaFactory.createForClass<User>(
  User,
) as SchemaType<User> & {
  methods: Pick<UserModel, 'checkPassword'>
}

UserSchema.methods.checkPassword = function (
  password: string,
): Promise<boolean> {
  const user = this as unknown as UserDocument

  return bcrypt.compare(password, user.password)
}

UserSchema.pre<UserDocument>('save', function (next) {
  const user = this

  user.email = user.email.toLowerCase()

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (genSaltError, salt) => {
    if (genSaltError) {
      return next(genSaltError)
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }

      user.password = hash

      next()
    })
  })
})

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user!: User

  @Field(() => String)
  token!: string
}
