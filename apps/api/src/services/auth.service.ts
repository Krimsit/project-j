import { Injectable, Inject, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'

import { UserService } from './user.service'

import type { LoginResponse, RegistrationResponse } from '@shared/types'
import type { CreateUserReturn } from '@services'
import type { UserDocument, ProjectDocument } from '@models'
import type {
  CreateLocalUserParams,
  CreateGoogleUserParams,
} from './user.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email)

    if (!user || !user.password) return null

    const valid = await verify(user.password, pass)

    if (!valid) return null

    return user
  }

  async validateGoogleUser(
    params: CreateGoogleUserParams,
  ): Promise<CreateUserReturn | null> {
    let user = await this.userService.findByGoogleId(params.googleId)
    let defaultProject: ProjectDocument | null = null

    if (!user) {
      user = await this.userService.findByEmail(params.email)

      if (!user) {
        const createdUser = await this.userService.createGoogleUser(params)

        user = createdUser?.createdUser ?? null
        defaultProject = createdUser?.defaultProject ?? null
      }
    }

    if (!user) {
      return null
    }

    return {
      createdUser: user,
      defaultProject: defaultProject,
    }
  }

  async login(user: UserDocument): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user._id }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async register(
    params: CreateLocalUserParams,
  ): Promise<RegistrationResponse | null> {
    const existingUser = await this.userService.findByEmail(params.email)

    if (existingUser)
      throw new UnauthorizedException('Email already registered')

    const user = await this.userService.createLocalUser(params)

    if (!user) {
      return null
    }

    const loginResponse = await this.login(user?.createdUser)

    return {
      ...loginResponse,
      defaultProjectId: user.defaultProject?.id ?? '',
    }
  }
}
