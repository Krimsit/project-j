import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskComment } from '@api/models'

import { TaskCommentsService } from '../services'
import { TaskCommentsResolver } from '../resolvers'
import { TaskCommentSchema } from '../models'

@Module({
  providers: [TaskCommentsService, TaskCommentsResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: TaskComment.name,
        schema: TaskCommentSchema,
      },
    ]),
  ],
  exports: [TaskCommentsService],
})
export class TaskCommentsModule {}
