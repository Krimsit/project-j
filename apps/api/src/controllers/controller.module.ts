import { Module } from '@nestjs/common'
import { ServicesModule } from '@services'

import { FilesController } from './files.controller'
import { AuthController } from './auth.controller'
import { UserController } from './user.controller'
import { ProjectController } from './project.controller'
import { BoardController } from './board.controller'
import { TaskController } from './task.controller'

@Module({
  imports: [ServicesModule],
  controllers: [
    AuthController,
    UserController,
    FilesController,
    ProjectController,
    BoardController,
    TaskController,
  ],
  providers: [
    AuthController,
    UserController,
    FilesController,
    ProjectController,
    BoardController,
    TaskController,
  ],
  exports: [AuthController, UserController, FilesController, ProjectController],
})
export class ControllersModule {}
