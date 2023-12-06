import { SchemaFactory } from '@nestjs/mongoose'
import { TaskComment } from '@api/models'

import type { Document } from 'mongoose'

export type TaskCommentDocument = Document & TaskComment

export const TaskCommentSchema =
  SchemaFactory.createForClass<TaskComment>(TaskComment)
