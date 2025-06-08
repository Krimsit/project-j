import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { hash } from 'argon2'

import { File } from './file.model'

import type { CallbackError, Document } from 'mongoose'
import type { FileDocument } from './file.model'

export type UserDocument = User & Document

export enum UserAuthProvider {
  Local = 'local',
  Google = 'google',
}

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email!: string

  @Prop({ type: String, required: false })
  password?: string

  @Prop({ type: String, required: true })
  username!: string

  @Prop({ type: String, required: true })
  firstName!: string

  @Prop({ type: String, required: true })
  lastName!: string

  @Prop({ type: String, required: false })
  midName?: string

  @Prop({ type: Types.ObjectId, ref: File.name, required: false })
  avatar?: FileDocument

  @Prop({
    type: String,
    enum: UserAuthProvider,
    default: UserAuthProvider.Local,
  })
  authProvider!: UserAuthProvider

  @Prop({ type: String, required: false, unique: true })
  googleId?: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next()

  if (this.password) {
    try {
      this.password = await hash(this.password)
      next()
    } catch (err) {
      next(err as CallbackError)
    }
  } else {
    next()
  }
})
