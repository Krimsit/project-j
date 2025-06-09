import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { TaskStatus } from '@shared/types'

import { User } from './user.model'
import { Project } from './project.model'
import { Board } from './board.model'
import { File } from './file.model'

import type { UserDocument } from './user.model'
import type { ProjectDocument } from './project.model'
import type { BoardDocument } from './board.model'
import type { FileDocument } from './file.model'

export type TaskDocument = Task & Document

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: String, required: true })
  name!: string

  @Prop({ type: String, required: false })
  description?: string

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  assigner!: UserDocument

  @Prop({ type: Date, required: true })
  dueDate!: Date

  @Prop({
    type: String,
    enum: TaskStatus,
    default: TaskStatus.ToDO,
  })
  status!: TaskStatus

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project!: ProjectDocument

  @Prop({ type: Types.ObjectId, ref: Board.name, required: true })
  board!: BoardDocument

  @Prop({
    type: [Types.ObjectId],
    ref: File.name,
    default: [],
  })
  files!: FileDocument[]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
