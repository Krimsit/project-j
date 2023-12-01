import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FirebaseModule } from '@api/firebase'

import { ProjectsService } from '../services'
import { ProjectsResolver } from '../resolvers'
import { ProjectSchema, Project } from '../models'

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
  ],
})
export class ProjectsModule {}
