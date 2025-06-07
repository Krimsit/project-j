import { Injectable, Inject, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy as BaseLocalStrategy } from 'passport-local'
import { Strategy as BaseJWTStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as CustomStrategy } from 'passport-custom'
import { GOOGLE_OAUTH } from '@core/configs'
import { AuthService, UserService } from '@services'

import type { Request } from 'express'
import type { OAuth2Client } from 'google-auth-library'
import type { EnvConfig } from '@core/configs'
import type { UserDocument } from '@models'

export type JWTPayload = {
  sub: string
}

@Injectable()
export class LocalStrategy extends PassportStrategy(
  BaseLocalStrategy,
  'local',
) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserDocument> {
    console.log(email, password)
    const user = await this.authService.validateUser(email, password)

    if (!user) throw new UnauthorizedException('Invalid credentials')

    return user
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJWTStrategy, 'jwt') {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('API_JWT_SECRET') ?? '',
    })
  }

  async validate(payload: JWTPayload) {
    const user = await this.userService.findById(payload.sub)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(CustomStrategy, 'google') {
  constructor(
    @Inject(GOOGLE_OAUTH) private readonly googleClient: OAuth2Client,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super()
  }

  async validate(req: Request) {
    const idToken = req.body?.idToken
    if (!idToken) {
      throw new UnauthorizedException('No ID token provided')
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.googleClient._clientId,
    })

    const payload = ticket.getPayload()

    if (!payload?.email) {
      throw new UnauthorizedException('Invalid token')
    }

    const { sub, email, name, given_name, family_name } = payload

    const user = await this.authService.validateGoogleUser({
      email,
      googleId: sub,
      username: name ?? '',
      firstName: given_name ?? '',
      lastName: family_name ?? '',
    })

    return user
  }
}
