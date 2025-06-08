import { Module } from '@nestjs/common'
import { ServicesModule } from '@services'

import { FilesController } from './files.controller'
import { AuthController } from './auth.controller'
import { UserController } from './user.controller'
import { ProjectController } from './project.controller'

@Module({
  imports: [ServicesModule],
  controllers: [
    AuthController,
    UserController,
    FilesController,
    ProjectController,
  ],
  providers: [
    AuthController,
    UserController,
    FilesController,
    ProjectController,
  ],
  exports: [AuthController, UserController, FilesController, ProjectController],
})
export class ControllersModule {}
