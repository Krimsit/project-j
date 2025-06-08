import { OAuth2Client } from 'google-auth-library'
import { ConfigService } from '@nestjs/config'
import { Provider } from '@nestjs/common'

import type { EnvConfig } from './env'

export const GOOGLE_OAUTH = 'GOOGLE_OAUTH'

export const GoogleOAuthProvider: Provider = {
  provide: GOOGLE_OAUTH,
  inject: [ConfigService],
  useFactory: (configService: ConfigService<EnvConfig>) => {
    const clientId = configService.get<string>('API_GOOGLE_CLIENT_ID')

    return new OAuth2Client(clientId)
  },
}
