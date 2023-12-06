import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { FirebaseModule } from '@api/firebase'
import { User } from '@api/models'

import { UserService } from '../services'
import { UserResolver } from '../resolvers'
import { UserSchema } from '../models'
import { AuthService, JwtStrategy } from '../jwt'

import type { ConfigServiceProps } from '@api/models'

@Module({
  providers: [UserService, UserResolver, AuthService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    FirebaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigServiceProps>) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
