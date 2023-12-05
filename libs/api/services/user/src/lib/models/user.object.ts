import { SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'
import { User } from '@api/models'

import type { UserModel } from '@api/models'
import type { Document, Schema as SchemaType } from 'mongoose'

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
