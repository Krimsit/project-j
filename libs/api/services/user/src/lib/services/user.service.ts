import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FirebaseService } from '@api/firebase'
import { User } from '@api/models'
import {
  registrationValidationSchema,
  loginValidationSchema,
} from '@shared/validations'

import { AuthService } from '../jwt'

import type { LoginResult, RegistrationForm, LoginForm } from '../models'
import type { UserDocument } from '../types'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec()

    if (user) return user

    return null
  }

  async findOneByUsername(username: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ username }).exec()

    if (user) return user

    return null
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async registration(data: RegistrationForm): Promise<LoginResult> {
    const validationResult = registrationValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const existedUserByEmail = await this.findOneByEmail(data.email)

    if (existedUserByEmail) {
      throw new BadRequestException('A user with such an email already exists')
    }

    const existedUserByUsername = await this.findOneByUsername(data.username)

    if (existedUserByUsername) {
      throw new BadRequestException(
        'A user with such an username already exists',
      )
    }

    const avatarUrl = await this.firebaseService.uploadFile(
      data.avatar.base64,
      data.avatar.filename,
    )
    const createdUser = new this.userModel({
      ...data,
      avatar: avatarUrl,
    })
    const token = this.authService.createJwt(createdUser)
    const user = await createdUser.save()

    return { user, token: token.token }
  }

  async login(data: LoginForm): Promise<LoginResult> {
    const validationResult = loginValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const result = await this.authService.validateUserByPassword(data)

    if (!result)
      throw new UnauthorizedException(
        'Could not login with the provided credentials',
      )

    return result
  }

  async delete(user: User): Promise<boolean> {
    const result = await this.userModel.deleteOne(user)

    if (result.deletedCount <= 0) {
      throw new BadRequestException('Errors occurred when deleting the user')
    }

    return true
  }
}
