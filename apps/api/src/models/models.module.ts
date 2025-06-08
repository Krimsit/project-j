import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './user.model'
import { File, FileSchema } from './file.model'
import { Project, ProjectSchema } from './project.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ModelsModule {}
