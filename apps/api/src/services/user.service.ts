import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserAuthProvider } from '@models'

import { FilesService } from './file.service'

import type { UserDocument } from '@models'

export type CreateLocalUserParams = Pick<
  User,
  'email' | 'username' | 'firstName' | 'lastName' | 'midName'
> &
  Required<Pick<User, 'password'>> & {
    avatar?: string
  }

export type CreateGoogleUserParams = Pick<
  User,
  'email' | 'username' | 'firstName' | 'lastName' | 'midName'
> &
  Required<Pick<User, 'googleId'>> & {
    avatar?: string
  }

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(FilesService) private readonly filesService: FilesService,
  ) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).populate(['avatar']).exec()
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).populate(['avatar']).exec()
  }

  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ googleId }).populate(['avatar']).exec()
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

  async deleteUnusedFiles() {
    const usedFiles = await this.userModel.distinct('avatar', {
      avatar: { $ne: null },
    })
    const usedFileIds = usedFiles.map((file) => file._id)

    for (const unusedFileId of usedFileIds) {
      await this.filesService.markFileForDeletion(unusedFileId)
    }
  }
}
