import { SchemaFactory } from '@nestjs/mongoose'
import { TaskComment } from '@api/models'

export const TaskCommentSchema =
  SchemaFactory.createForClass<TaskComment>(TaskComment)
