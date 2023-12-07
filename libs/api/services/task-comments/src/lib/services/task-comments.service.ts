import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { taskCommentValidationSchema } from '@shared/validations'
import { TaskComment, User } from '@api/models'

import type { TaskCommentForm } from '../models'
import type { TaskCommentDocument } from '../types'

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectModel(TaskComment.name)
    private readonly taskCommentModel: Model<TaskCommentDocument>,
  ) {}

  async getTaskComments(taskId: string): Promise<TaskComment[]> {
    return this.taskCommentModel
      .find({
        task: taskId,
      })
      .populate({ path: 'user', model: User.name })
      .exec()
  }

  async create(data: TaskCommentForm, user: User): Promise<TaskComment> {
    const validationResult = taskCommentValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const createdComment = new this.taskCommentModel({
      ...data,
      user: user._id,
      task: data.task_id,
    })

    await createdComment.populate({ path: 'user', model: User.name })

    return await createdComment.save()
  }
}
