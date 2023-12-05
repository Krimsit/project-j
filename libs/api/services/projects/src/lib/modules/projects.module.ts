import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FirebaseModule } from '@api/firebase'
import { TasksModule } from '@api/tasks'
import { Project } from '@api/models'

import { ProjectsService } from '../services'
import { ProjectsResolver } from '../resolvers'
import { ProjectSchema } from '../models'

@Module({
  providers: [ProjectsService, ProjectsResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    FirebaseModule,
    TasksModule,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
