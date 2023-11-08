import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User } from '@shared/models'

import { UserService } from '../services'
import { UserResolver } from '../resolvers'
import { UserSchema } from '../models'

@Module({
  providers: [UserService, UserResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UserModule {}
