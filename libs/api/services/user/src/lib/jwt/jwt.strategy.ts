import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthService } from './jwt.service'

import type { ConfigServiceProps } from '@api/models'
import type { JwtPayload } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ConfigServiceProps>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(configService.get('JWT_SECRET')),
      ignoreExpiration: false,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateJwtPayload(payload)

    if (!user) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      )
    }

    return user
  }
}
