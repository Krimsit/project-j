import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FirebaseModule } from '@api/firebase'
import { Task } from '@api/models'

import { TasksService } from '../services'
import { TaskResolver } from '../resolvers'
import { TaskSchema } from '../models'

@Module({
  providers: [TasksService, TaskResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
    FirebaseModule,
  ],
  exports: [TasksService],
})
export class TasksModule {}
