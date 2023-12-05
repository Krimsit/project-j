import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, JwtGuard } from '@api/secure'
import { Task, User } from '@api/models'

import {
  TaskForm,
  UpdateTaskAssignerForm,
  UpdateTaskStatusForm,
  UpdateTaskAttachmentsForm,
  TaskStatusItem,
} from '../models'
import { TasksService } from '../services'

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  @UseGuards(JwtGuard)
  async getUserTasks(@CurrentUser() user: User): Promise<Task[]> {
    return this.tasksService.getUserTasks(user)
  }

  @Query(() => [Task])
  @UseGuards(JwtGuard)
  async getProjectTasks(@Args('projectId') projectId: string): Promise<Task[]> {
    return this.tasksService.getProjectTasks(projectId)
  }

  @Query(() => Task)
  @UseGuards(JwtGuard)
  async getTask(@Args('taskId') taskId: string): Promise<Task> {
    return this.tasksService.findById(taskId)
  }

  @Query(() => [TaskStatusItem])
  @UseGuards(JwtGuard)
  async getTaskNextStatuses(
    @Args('taskId') taskId: string,
  ): Promise<TaskStatusItem[]> {
    return this.tasksService.getTaskNextStatuses(taskId)
  }

  @Mutation(() => Task)
  @UseGuards(JwtGuard)
  async createTask(@Args('data') data: TaskForm): Promise<Task> {
    return this.tasksService.create(data)
  }

  @Mutation(() => Task)
  @UseGuards(JwtGuard)
  async updateTask(
    @Args('data') data: TaskForm,
    @Args('taskId') taskId: string,
  ): Promise<Task> {
    return this.tasksService.update(data, taskId)
  }

  @Mutation(() => Task)
  @UseGuards(JwtGuard)
  async updateTaskAssigner(
    @Args('data') data: UpdateTaskAssignerForm,
    @Args('taskId') taskId: string,
  ): Promise<Task> {
    return this.tasksService.updateAssigner(data, taskId)
  }

  @Mutation(() => Task)
  @UseGuards(JwtGuard)
  async updateTaskStatus(
    @Args('data') data: UpdateTaskStatusForm,
    @Args('taskId') taskId: string,
  ): Promise<Task> {
    return this.tasksService.updateStatus(data, taskId)
  }

  @Mutation(() => Task)
  @UseGuards(JwtGuard)
  async updateTaskAttachments(
    @Args('data') data: UpdateTaskAttachmentsForm,
    @Args('taskId') taskId: string,
  ): Promise<Task> {
    return this.tasksService.updateAttachments(data, taskId)
  }

  @Mutation(() => Task)
  @UseGuards(JwtGuard)
  async deleteTask(@Args('taskId') taskId: string): Promise<Task> {
    return this.tasksService.delete(taskId)
  }
}
