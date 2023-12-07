import { Field, ObjectType } from '@nestjs/graphql'
import { SchemaFactory } from '@nestjs/mongoose'
import { Project } from '@api/models'

import type { Project as ProjectType } from '@shared/models'

export const ProjectSchema = SchemaFactory.createForClass<Project>(Project)

@ObjectType()
export class ProjectResponse extends Project implements ProjectType {
  @Field(() => Number)
  allTasksCount!: number

  @Field(() => Number)
  completedTasksCount!: number
}
