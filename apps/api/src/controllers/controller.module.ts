import { Module } from '@nestjs/common'
import { ServicesModule } from '@services'

import { FilesController } from './files.controller'
import { AuthController } from './auth.controller'
import { UserController } from './user.controller'

@Module({
  imports: [ServicesModule],
  controllers: [AuthController, UserController, FilesController],
  providers: [AuthController, UserController, FilesController],
  exports: [AuthController, UserController, FilesController],
})
export class ControllersModule {}
