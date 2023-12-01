import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, JwtGuard } from '@api/secure'
import { User } from '@api/user'

import { Project, ProjectForm, UpdateProjectUsersForm } from '../models'
import { ProjectsService } from '../services'

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  @UseGuards(JwtGuard)
  async createProject(
    @Args('data') data: ProjectForm,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.create(data, user)
  }

  @Mutation(() => Project)
  @UseGuards(JwtGuard)
  async updateProject(
    @Args('data') data: ProjectForm,
    @Args('projectId') projectId: string,
  ): Promise<Project> {
    return this.projectsService.update(data, projectId)
  }

  @Query(() => [Project])
  @UseGuards(JwtGuard)
  async getUserProjects(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectsService.getUserProjects(user)
  }

  @Mutation(() => Project)
  @UseGuards(JwtGuard)
  async updateProjectUsers(
    @Args('data') data: UpdateProjectUsersForm,
  ): Promise<Project> {
    return this.projectsService.updateUsers(data)
  }

  @Query(() => Project)
  async getProject(@Args('projectId') projectId: string): Promise<Project> {
    return this.projectsService.findById(projectId)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGuard)
  async deleteProject(@Args('projectId') projectId: string): Promise<boolean> {
    return this.projectsService.delete(projectId)
  }
}
