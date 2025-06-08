import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserAuthProvider } from '@models'

import type { UserDocument } from '@models'

export type CreateLocalUserParams = Pick<
  User,
  'email' | 'username' | 'firstName' | 'lastName' | 'midName'
> &
  Required<Pick<User, 'password'>>

export type CreateGoogleUserParams = Pick<
  User,
  'email' | 'username' | 'firstName' | 'lastName' | 'midName'
> &
  Required<Pick<User, 'googleId'>>

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec()
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec()
  }

  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ googleId }).exec()
  }

  async createLocalUser(params: CreateLocalUserParams): Promise<UserDocument> {
    const createdUser = new this.userModel({
      ...params,
      authProvider: UserAuthProvider.Local,
    })

    return createdUser.save()
  }

  async createGoogleUser(
    params: CreateGoogleUserParams,
  ): Promise<UserDocument> {
    const createdUser = new this.userModel({
      ...params,
      authProvider: UserAuthProvider.Google,
    })

    return createdUser.save()
  }
}
