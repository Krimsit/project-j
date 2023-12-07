import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FirebaseService } from '@api/firebase'
import { Task, User, Project } from '@api/models'
import { taskValidationSchema } from '@shared/validations'
import { TaskStatus } from '@shared/models'
import {
  taskStatusesAfterToDo,
  taskStatusesAfterInProgress,
  taskStatusesAfterUnderReview,
  taskStatusesAfterOnHold,
} from '@shared/constants'

import type {
  TaskForm,
  UpdateTaskAssignerForm,
  UpdateTaskStatusForm,
  UpdateTaskAttachmentsForm,
  TaskStatusItem,
} from '../models'
import type { TaskDocument } from '../types'

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findById(taskId: string): Promise<TaskDocument> {
    const task = await this.taskModel
      .findById(taskId)
      .populate({
        path: 'assigner',
        model: User.name,
      })
      .populate({ path: 'project', model: Project.name })
      .exec()

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  async getUserTasks(user: User): Promise<Task[]> {
    return await this.taskModel
      .find({
        assigner: user._id,
      })
      .populate({ path: 'assigner', model: User.name })
      .populate({ path: 'project', model: Project.name })
      .exec()
  }

  async getProjectTasks(projectId: string): Promise<Task[]> {
    return await this.taskModel
      .find({
        project: projectId,
      })
      .populate({ path: 'assigner', model: User.name })
      .populate({ path: 'project', model: Project.name })
      .exec()
  }

  async getTaskNextStatuses(taskId: string): Promise<TaskStatusItem[]> {
    const task = await this.taskModel.findById(taskId).exec()

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    switch (task.status) {
      case TaskStatus.OnHold:
        return taskStatusesAfterOnHold
      case TaskStatus.ToDo:
        return taskStatusesAfterToDo
      case TaskStatus.InProgress:
        return taskStatusesAfterInProgress
      case TaskStatus.UnderReview:
        return taskStatusesAfterUnderReview
      default:
        return []
    }
  }

  async create(data: TaskForm): Promise<Task> {
    const validationResult = taskValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const attachments = data.attachments
      ? await this.firebaseService.uploadManyFiles(data.attachments)
      : []
    const createdTask = new this.taskModel({
      ...data,
      project: data.project_id,
      assigner: data.assigner,
      attachments,
    })

    await createdTask.populate({
      path: 'assigner',
      model: User.name,
    })
    await createdTask.populate({
      path: 'project',
      model: Project.name,
    })

    return await createdTask.save()
  }

  async update(data: TaskForm, taskId: string): Promise<Task> {
    const validationResult = taskValidationSchema.safeParse(data)

    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error)
    }

    const task = await this.taskModel
      .findByIdAndUpdate(taskId, data, {
        new: true,
      })
      .populate({ path: 'assigner', model: User.name })
      .populate({ path: 'project', model: Project.name })
      .exec()

    if (!task) {
      throw new BadRequestException('Errors occurred when updating the task')
    }

    return task
  }

  async updateAssigner(
    data: UpdateTaskAssignerForm,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(
        taskId,
        { assigner: data.assigner },
        {
          new: true,
        },
      )
      .populate({ path: 'assigner', model: User.name })
      .populate({ path: 'project', model: Project.name })
      .exec()

    if (!task) {
      throw new BadRequestException('Errors occurred when updating the task')
    }

    return task
  }

  async updateStatus(
    data: UpdateTaskStatusForm,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(
        taskId,
        { status: data.status },
        {
          new: true,
        },
      )
      .populate({ path: 'assigner', model: User.name })
      .populate({ path: 'project', model: Project.name })
      .exec()

    if (!task) {
      throw new BadRequestException('Errors occurred when updating the task')
    }

    return task
  }

  async updateAttachments(
    data: UpdateTaskAttachmentsForm,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec()

    if (!task) {
      throw new BadRequestException('Errors occurred when updating the task')
    }

    const attachments = await this.firebaseService.uploadManyFiles(
      data.attachments,
    )

    await task
      .updateOne(
        {
          attachments: [...task.attachments, ...attachments],
        },
        {
          new: true,
        },
      )
      .populate({ path: 'assigner', model: User.name })
      .populate({ path: 'project', model: Project.name })
      .exec()

    return task
  }

  async delete(taskId: string): Promise<TaskDocument> {
    const result = await this.taskModel.findByIdAndDelete(taskId).exec()

    if (!result) {
      throw new BadRequestException('Errors occurred when deleting the task')
    }

    return result
  }

  async getProjectTaskCount(projectId: string): Promise<number> {
    const tasks = await this.getProjectTasks(projectId)

    return tasks.length
  }

  async getProjectCompletedTaskCount(projectId: string): Promise<number> {
    const tasks = await this.getProjectTasks(projectId)
    const completedTask = tasks.filter(
      (item) => item.status === TaskStatus.Done,
    )

    return completedTask.length
  }
}
