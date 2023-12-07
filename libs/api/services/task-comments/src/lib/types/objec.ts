import type { Document } from 'mongoose'
import type { TaskComment } from '@api/models'

export type TaskCommentDocument = Document & TaskComment
