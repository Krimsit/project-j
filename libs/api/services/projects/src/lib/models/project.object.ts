import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Project, User } from '@api/models'

import type { Document } from 'mongoose'
import type { Project as ProjectType } from '@shared/models'

export type ProjectDocument = Document & Project

export const ProjectSchema = SchemaFactory.createForClass<Project>(Project)

@ObjectType()
export class ProjectResponse extends Project implements ProjectType {
  @Field(() => Number)
  allTasksCount!: number

  @Field(() => Number)
  completedTasksCount!: number
}
