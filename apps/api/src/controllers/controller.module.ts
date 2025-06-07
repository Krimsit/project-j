import { Module } from '@nestjs/common'
import { ServicesModule } from '@services'

import { AuthController } from './auth.controller'
import { UserController } from './user.controller'

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, UserController],
  providers: [AuthController, UserController],
  exports: [AuthController, UserController],
})
export class ControllersModule {}
