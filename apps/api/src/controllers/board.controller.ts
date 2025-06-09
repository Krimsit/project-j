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
import { boardEndpoints } from '@shared/api'
import { JwtAuthGuard } from '@secure'
import { UserDecorator } from '@decorators'
import { BoardService, ProjectService } from '@services'
import { parseBoardResponse } from '@utils'

import type {
  BoardResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectBoard,
} from '@shared/types'
import type { UserDocument } from '@models'

@Controller()
export class BoardController {
  constructor(
    @Inject(BoardService) private boardService: BoardService,
    @Inject(ProjectService) private projectService: ProjectService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(boardEndpoints.get)
  async getBoard(@Query('id') id: string): Promise<BoardResponse> {
    const board = await this.boardService.findById(id)

    if (!board) {
      throw new NotFoundException('Board not found')
    }

    return parseBoardResponse(board)
  }

  @UseGuards(JwtAuthGuard)
  @Get(boardEndpoints.projectBoard)
  async getProjectBoards(
    @Query('projectId') projectId: string,
  ): Promise<ProjectBoard[]> {
    const project = await this.projectService.findById(projectId)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    const boards = await this.boardService.getProjectBoards(project.id)

    return boards.map((item) => ({
      id: item.id,
      name: item.name,
    }))
  }

  @UseGuards(JwtAuthGuard)
  @Post(boardEndpoints.create)
  async createBoard(
    @Body() params: CreateProjectRequest,
    @UserDecorator() user: UserDocument,
    @Query('projectId') projectId: string,
  ): Promise<BoardResponse> {
    const project = await this.projectService.findById(projectId)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.owner.id !== user.id) {
      throw new ForbiddenException('Project not found')
    }

    const board = await this.boardService.createBoard({
      ...params,
      project: project.id,
      owner: user.id,
    })

    if (!board) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseBoardResponse(board)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(boardEndpoints.update)
  async updateBoard(
    @Body() params: UpdateProjectRequest,
    @UserDecorator() user: UserDocument,
    @Query('id') id: string,
  ): Promise<BoardResponse> {
    const board = await this.boardService.findById(id)

    if (!board) {
      throw new NotFoundException('Board not found')
    }

    if (board.owner.id !== user.id) {
      throw new ForbiddenException('Board not found')
    }

    const updatedBoard = await this.boardService.updateBoard({
      ...params,
      id: board.id,
    })

    if (!updatedBoard) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseBoardResponse(updatedBoard)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(boardEndpoints.delete)
  async deleteBoard(
    @UserDecorator() user: UserDocument,
    @Query('id') id: string,
  ): Promise<BoardResponse> {
    const board = await this.boardService.findById(id)

    if (!board) {
      throw new NotFoundException('Board not found')
    }

    if (board.owner.id !== user.id) {
      throw new ForbiddenException('Board not found')
    }

    const deletedBoard = await this.boardService.deleteBoard(board.id)

    if (!deletedBoard) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseBoardResponse(deletedBoard)
  }
}
