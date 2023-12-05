import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../services'

import type { User, ConfigServiceProps } from '@api/models'
import type { LoginResult, UserDocument, LoginForm } from '../models'
import type { JwtPayload } from './jwt.payload'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private _usersService: UserService,
    private _jwtService: JwtService,
    private configService: ConfigService<ConfigServiceProps>,
  ) {}

  async validateUserByPassword(
    loginAttempt: LoginForm,
  ): Promise<LoginResult | null> {
    let userToAttempt: UserDocument | null = null

    if (loginAttempt.email) {
      userToAttempt = await this._usersService.findOneByEmail(
        loginAttempt.email,
      )
    }

    if (!userToAttempt) return null

    let isMatch = false

    try {
      isMatch = await userToAttempt.checkPassword(loginAttempt.password)
    } catch (error) {
      return null
    }

    if (isMatch) {
      const { token } = this.createJwt(userToAttempt)
      const result: LoginResult = {
        user: userToAttempt,
        token,
      }

      await userToAttempt.save()

      return result
    }

    return null
  }

  async validateJwtPayload(payload: JwtPayload): Promise<UserDocument | null> {
    const user = await this._usersService.findOneByEmail(payload.email)

    if (user) {
      await user.save()

      return user
    }

    return null
  }

  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = Number(this.configService.get('JWT_EXPIRES_IN'))
    let expiration: Date | undefined = undefined

    if (expiresIn) {
      expiration = new Date()
      expiration.setTime(expiration.getTime() + expiresIn * 1000)
    }

    const data: JwtPayload = {
      email: user.email,
      _id: user._id,
      expiration,
    }
    const jwt = this._jwtService.sign(data)

    return {
      data,
      token: jwt,
    }
  }
}
