import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  Inject,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common'
import { JwtAuthGuard } from '@secure'
import { taskEndpoints } from '@shared/api'
import { UserDecorator } from '@decorators'
import { TaskService, BoardService, ProjectService } from '@services'
import { parseTaskResponse, parseTaskCardResponse } from '@utils'

import type {
  TaskResponse,
  TaskCardResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskNextStatusesResponse,
} from '@shared/types'
import type { UserDocument } from '@models'

@Controller()
export class TaskController {
  constructor(
    @Inject(TaskService) private taskService: TaskService,
    @Inject(BoardService) private boardService: BoardService,
    @Inject(ProjectService) private projectService: ProjectService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(taskEndpoints.get)
  async getProject(@Query('id') id: string): Promise<TaskResponse> {
    const task = await this.taskService.findById(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return parseTaskResponse(task)
  }

  @UseGuards(JwtAuthGuard)
  @Get(taskEndpoints.boardTasks)
  async getBoardTasks(
    @Query('boardId') boardId: string,
  ): Promise<TaskCardResponse[]> {
    const board = await this.boardService.findById(boardId)

    if (!board) {
      throw new NotFoundException('Board not found')
    }

    const tasks = await this.taskService.getBoardTasks(board.id)

    return tasks.map((item) => parseTaskCardResponse(item))
  }

  @UseGuards(JwtAuthGuard)
  @Get(taskEndpoints.userProjectTasks)
  async getUserProjectTasks(
    @UserDecorator() user: UserDocument,
    @Query('projectId') projectId: string,
  ): Promise<TaskCardResponse[]> {
    const project = await this.projectService.findById(projectId)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    const tasks = await this.taskService.getUserProjectTasks(
      user.id,
      project.id,
    )

    return tasks.map((item) => parseTaskCardResponse(item))
  }

  @UseGuards(JwtAuthGuard)
  @Post(taskEndpoints.create)
  async createTask(
    @Body() params: CreateTaskRequest,
    @UserDecorator() user: UserDocument,
    @Query('boardId') boardId: string,
    @Query('projectId') projectId: string,
  ): Promise<TaskResponse> {
    const project = await this.projectService.findById(projectId)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.owner.id !== user.id) {
      throw new ForbiddenException('Project not found')
    }

    const board = await this.boardService.findById(boardId)

    if (!board) {
      throw new NotFoundException('Board not found')
    }

    if (board.owner.id !== user.id) {
      throw new ForbiddenException('Board not found')
    }

    const task = await this.taskService.createTask({
      ...params,
      project: project.id,
      board: board.id,
      assigner: user.id,
    })

    if (!task) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseTaskResponse(task)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(taskEndpoints.update)
  async updateBoard(
    @Body() params: UpdateTaskRequest,
    @Query('id') id: string,
  ): Promise<TaskResponse> {
    const task = await this.taskService.findById(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    const updatedTask = await this.taskService.updateTask({
      ...params,
      id: task.id,
    })

    if (!updatedTask) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseTaskResponse(updatedTask)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(taskEndpoints.delete)
  async deleteBoard(@Query('id') id: string): Promise<TaskResponse> {
    const task = await this.taskService.findById(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    const deletedTask = await this.taskService.deleteTask(task.id)

    if (!deletedTask) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseTaskResponse(deletedTask)
  }

  @UseGuards(JwtAuthGuard)
  @Get(taskEndpoints.nextStatuses)
  async getNextStatues(
    @Query('id') id: string,
  ): Promise<TaskNextStatusesResponse> {
    const task = await this.taskService.findById(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    const nextStatuses = await this.taskService.getNextStatuses(task.id)

    if (!nextStatuses) {
      throw new InternalServerErrorException('An error occurred')
    }

    return nextStatuses
  }
}
