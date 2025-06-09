import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { User } from './user.model'
import { Project } from './project.model'

import type { UserDocument } from './user.model'
import type { ProjectDocument } from './project.model'

export type BoardDocument = Board & Document

@Schema({ timestamps: true })
export class Board {
  @Prop({ type: String, required: true })
  name!: string

  @Prop({ type: String, required: false })
  description?: string

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner!: UserDocument

  @Prop({ type: Types.ObjectId, ref: Project.name, required: false })
  project?: ProjectDocument
}

export const BoardSchema = SchemaFactory.createForClass(Board)
