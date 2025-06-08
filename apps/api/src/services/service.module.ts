import { Module } from '@nestjs/common'
import { JwtModule } from '@core/configs'
import { ModelsModule } from '@models'

import { UserService } from './user.service'
import { AuthService } from './auth.service'

@Module({
  imports: [ModelsModule, JwtModule],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class ServicesModule {}
