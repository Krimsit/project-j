import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'

import { AuthService } from './jwt.service'

import type { JwtPayload } from './jwt.payload'
import type { ConfigServiceProps } from '@api/models'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _authService: AuthService,
    private configService: ConfigService<ConfigServiceProps>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(configService.get('JWT_SECRET')),
      ignoreExpiration: false,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this._authService.validateJwtPayload(payload)

    if (!user) {
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials',
      )
    }

    return user
  }
}
