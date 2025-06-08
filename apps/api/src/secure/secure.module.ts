import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GoogleOAuthProvider, JwtModule } from '@core/configs'
import { ServicesModule } from '@services'

import { LocalStrategy, GoogleStrategy, JwtStrategy } from './strategies'

@Module({
  imports: [ConfigModule, ServicesModule, JwtModule],
  providers: [GoogleOAuthProvider, LocalStrategy, GoogleStrategy, JwtStrategy],
  exports: [LocalStrategy, GoogleStrategy, JwtStrategy, JwtModule],
})
export class SecureModule {}
