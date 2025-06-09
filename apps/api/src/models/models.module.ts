import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './user.model'
import { File, FileSchema } from './file.model'
import { Project, ProjectSchema } from './project.model'
import { Board, BoardSchema } from './board.model'
import { Task, TaskSchema } from './task.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Board.name, schema: BoardSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ModelsModule {}
