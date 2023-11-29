import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { FirebaseModule } from '@api/firebase'

import { UserService } from '../services'
import { UserResolver } from '../resolvers'
import { UserSchema, User } from '../models'
import { AuthService, JwtStrategy } from '../jwt'

@Module({
  providers: [UserService, UserResolver, AuthService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '600s',
      },
    }),
    FirebaseModule,
  ],
})
export class UserModule {}
