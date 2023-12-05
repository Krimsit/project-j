import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, JwtGuard } from '@api/secure'
import { Project, User } from '@api/models'

import { ProjectForm, UpdateProjectUsersForm, ProjectResponse } from '../models'
import { ProjectsService } from '../services'

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => ProjectResponse)
  @UseGuards(JwtGuard)
  async createProject(
    @Args('data') data: ProjectForm,
    @CurrentUser() user: User,
  ): Promise<ProjectResponse> {
    return this.projectsService.create(data, user)
  }

  @Mutation(() => ProjectResponse)
  @UseGuards(JwtGuard)
  async updateProject(
    @Args('data') data: ProjectForm,
    @Args('projectId') projectId: string,
  ): Promise<ProjectResponse> {
    return this.projectsService.update(data, projectId)
  }

  @Query(() => [ProjectResponse])
  @UseGuards(JwtGuard)
  async getUserProjects(@CurrentUser() user: User): Promise<ProjectResponse[]> {
    return await this.projectsService.getUserProjects(user)
  }

  @Mutation(() => ProjectResponse)
  @UseGuards(JwtGuard)
  async updateProjectUsers(
    @Args('data') data: UpdateProjectUsersForm,
  ): Promise<ProjectResponse> {
    return this.projectsService.updateUsers(data)
  }

  @Query(() => ProjectResponse)
  async getProject(
    @Args('projectId') projectId: string,
  ): Promise<ProjectResponse> {
    return this.projectsService.getById(projectId)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGuard)
  async deleteProject(@Args('projectId') projectId: string): Promise<boolean> {
    return this.projectsService.delete(projectId)
  }
}
