import { SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { TaskStatus } from '@shared/models'
import { Task } from '@api/models'

import type { Document } from 'mongoose'
import type { TaskStatusItem as TaskStatusItemType } from '@shared/models'

export type TaskDocument = Document & Task

export const TaskSchema = SchemaFactory.createForClass<Task>(Task)

TaskSchema.pre<TaskDocument>('save', function (next) {
  const task = this

  task.status = TaskStatus.ToDo

  if (!task.isModified('status')) {
    return next()
  }

  next()
})

@ObjectType()
export class TaskStatusItem implements TaskStatusItemType {
  @Field(() => Number)
  value!: TaskStatus

  @Field(() => String)
  label!: string
}
