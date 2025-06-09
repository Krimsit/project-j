import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { TaskStatus } from '@shared/types'
import type { TaskDocument } from '@models'
import { Task } from '@models'

import { FilesService } from './file.service'

export type CreateTaskParams = Pick<Task, 'name' | 'description'> & {
  assigner: string
  board: string
  project: string
  files?: string[]
}

export type UpdateTaskParams = Partial<
  Omit<CreateTaskParams, 'assigner' | 'files' | 'status'>
> & {
  id: string
}

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @Inject(FilesService) private readonly filesService: FilesService,
  ) {}

  async findById(id: string): Promise<TaskDocument | null> {
    return this.taskModel
      .findById(id)
      .populate(['assigner', 'board', 'project', 'files'])
      .exec()
  }

  async getUserProjectTasks(
    userId: string,
    projectId: string,
  ): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ assigner: userId, project: projectId })
      .populate(['assigner', 'board', 'project', 'files'])
      .exec()
  }

  async getProjectTasks(projectId: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ project: projectId })
      .populate(['assigner', 'board', 'project', 'files'])
      .exec()
  }

  async getBoardTasks(boardId: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ board: boardId })
      .populate(['assigner', 'board', 'project', 'files'])
      .exec()
  }

  async createTask(params: CreateTaskParams): Promise<TaskDocument | null> {
    const createdTask = new this.taskModel(params)

    return createdTask.save()
  }

  async updateTask({
    id,
    ...params
  }: UpdateTaskParams): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndUpdate(
      id,
      {
        ...params,
      },
      {
        new: true,
      },
    )
  }

  async uploadTaskFile(
    taskId: string,
    fileId: string,
  ): Promise<TaskDocument | null> {
    const task = await this.findById(taskId)

    if (!task) {
      return null
    }

    const newFiles = [...task.files, fileId]

    return task.updateOne(
      {
        files: newFiles,
      },
      {
        new: true,
      },
    )
  }

  async deleteTaskFile(
    taskId: string,
    fileId: string,
  ): Promise<TaskDocument | null> {
    const task = await this.findById(taskId)

    if (!task) {
      return null
    }

    const newFiles = (task.files as unknown as string[]).filter(
      (item) => item !== fileId,
    )

    return task.updateOne(
      {
        files: newFiles,
      },
      {
        new: true,
      },
    )
  }

  async deleteTask(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndDelete(id)
  }

  async getNextStatuses(taskId: string): Promise<TaskStatus[] | null> {
    const task = await this.findById(taskId)

    if (!task) {
      return null
    }

    if (task.status === TaskStatus.ToDO) {
      return [TaskStatus.InProgress, TaskStatus.Cancelled, TaskStatus.OnHold]
    }

    if (task.status === TaskStatus.InProgress) {
      return [TaskStatus.UnderReview, TaskStatus.Cancelled, TaskStatus.OnHold]
    }

    if (task.status === TaskStatus.UnderReview) {
      return [TaskStatus.Done, TaskStatus.Cancelled, TaskStatus.OnHold]
    }

    if (task.status === TaskStatus.OnHold) {
      return [
        TaskStatus.ToDO,
        TaskStatus.InProgress,
        TaskStatus.UnderReview,
        TaskStatus.Cancelled,
      ]
    }

    return []
  }

  async deleteUnusedFiles() {
    const allUserFiles = (await this.taskModel.distinct(
      'files',
    )) as unknown as Types.ObjectId[][]
    const parsedAllUserFiles = allUserFiles.reduce<Types.ObjectId[]>(
      (acc, curr) => {
        return [...acc, ...curr]
      },
      [],
    )
    const usedFiles =
      await this.filesService.findAllUnusedFiles(parsedAllUserFiles)

    for (const unusedFileId of usedFiles) {
      await this.filesService.markFileForDeletion(unusedFileId.id)
    }
  }
}
