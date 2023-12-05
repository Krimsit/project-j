import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { FirebaseModule } from '@api/firebase'
import { User } from '@api/models'

import { UserService } from '../services'
import { UserResolver } from '../resolvers'
import { UserSchema } from '../models'
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
  exports: [UserService],
})
export class UserModule {}
