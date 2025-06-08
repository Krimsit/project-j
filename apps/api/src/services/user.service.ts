import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { User, UserAuthProvider } from '@models'

import { FilesService } from './file.service'
import { ProjectService } from './project.service'

import type { UserDocument, ProjectDocument } from '@models'

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

export type CreateUserReturn = {
  createdUser: UserDocument
  defaultProject: ProjectDocument | null
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(ProjectService) private readonly projectService: ProjectService,
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

  async createLocalUser(
    params: CreateLocalUserParams,
  ): Promise<CreateUserReturn | null> {
    const newUser = new this.userModel({
      ...params,
      authProvider: UserAuthProvider.Local,
    })
    const createdUser = await newUser.save()

    if (!createdUser) {
      return null
    }

    const createUserParams = await this.afterCreateUser(createdUser)

    return {
      createdUser,
      ...createUserParams,
    }
  }

  async createGoogleUser(
    params: CreateGoogleUserParams,
  ): Promise<CreateUserReturn | null> {
    const newUser = new this.userModel({
      ...params,
      authProvider: UserAuthProvider.Google,
    })

    const createdUser = await newUser.save()

    if (!createdUser) {
      return null
    }

    const createUserParams = await this.afterCreateUser(createdUser)

    return {
      createdUser,
      ...createUserParams,
    }
  }

  async deleteUnusedFiles() {
    const allUserFiles = (await this.userModel.distinct('avatar', {
      avatar: { $ne: null },
    })) as Types.ObjectId[]
    const usedFiles = await this.filesService.findAllUnusedFiles(allUserFiles)

    for (const unusedFileId of usedFiles) {
      await this.filesService.markFileForDeletion(unusedFileId.id)
    }
  }

  private async afterCreateUser(
    user: UserDocument,
  ): Promise<Pick<CreateUserReturn, 'defaultProject'>> {
    const createdDefaultProjedt = await this.projectService.createProject({
      name: 'Default Project',
      owner: user.id,
    })

    return {
      defaultProject: createdDefaultProjedt,
    }
  }
}
