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
import { projectEndpoints } from '@shared/api'
import { JwtAuthGuard } from '@secure'
import { UserDecorator } from '@decorators'
import { ProjectService } from '@services'
import { parseProjectResponse } from '@utils'

import type {
  ProjectResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
  MyProject,
} from '@shared/types'
import type { UserDocument } from '@models'

@Controller()
export class ProjectController {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get(projectEndpoints.get)
  async getProject(@Query('id') id: string): Promise<ProjectResponse> {
    const project = await this.projectService.findById(id)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    return parseProjectResponse(project)
  }

  @UseGuards(JwtAuthGuard)
  @Get(projectEndpoints.myProjects)
  async getUserProjects(
    @UserDecorator() user: UserDocument,
  ): Promise<MyProject[]> {
    const project = await this.projectService.getUserProjects(user.id)

    return project.map((item) => ({
      id: item.id,
      name: item.name,
      gradient: item.gradient,
    }))
  }

  @UseGuards(JwtAuthGuard)
  @Post(projectEndpoints.create)
  async createProject(
    @Body() params: CreateProjectRequest,
    @UserDecorator() user: UserDocument,
  ): Promise<ProjectResponse> {
    const project = await this.projectService.createProject({
      ...params,
      owner: user.id,
    })

    if (!project) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseProjectResponse(project)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(projectEndpoints.update)
  async updateProject(
    @Body() params: UpdateProjectRequest,
    @UserDecorator() user: UserDocument,
    @Query('id') id: string,
  ): Promise<ProjectResponse> {
    const project = await this.projectService.findById(id)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.owner.id !== user.id) {
      throw new ForbiddenException('Project not found')
    }

    const updatedProject = await this.projectService.updateProject({
      ...params,
      id: project.id,
    })

    if (!updatedProject) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseProjectResponse(project)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(projectEndpoints.delete)
  async deleteProject(
    @UserDecorator() user: UserDocument,
    @Query('id') id: string,
  ): Promise<ProjectResponse> {
    const project = await this.projectService.findById(id)

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    if (project.owner.id !== user.id) {
      throw new ForbiddenException('Project not found')
    }

    const deletedProject = await this.projectService.deleteProject(project.id)

    if (!deletedProject) {
      throw new InternalServerErrorException('An error occurred')
    }

    return parseProjectResponse(deletedProject)
  }
}
