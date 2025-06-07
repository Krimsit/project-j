import { ConfigService } from '@nestjs/config'
import { JwtModule as BaseJwtModule } from '@nestjs/jwt'

import type { EnvConfig } from './env'

export const JwtModule = BaseJwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService<EnvConfig>) => ({
    secret: configService.get<string>('API_JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('API_JWT_EXPIRED'),
    },
  }),
})
