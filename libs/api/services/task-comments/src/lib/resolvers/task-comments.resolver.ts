import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, JwtGuard } from '@api/secure'
import { TaskComment, User } from '@api/models'

import { TaskCommentsService } from '../services'
import { TaskCommentForm } from '../models'

@Resolver(() => TaskComment)
export class TaskCommentsResolver {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Query(() => [TaskComment])
  @UseGuards(JwtGuard)
  async getTaskComments(
    @Args('taskId') taskId: string,
  ): Promise<TaskComment[]> {
    return this.taskCommentsService.getTaskComments(taskId)
  }

  @Mutation(() => TaskComment)
  @UseGuards(JwtGuard)
  async createTaskComment(
    @Args('data') data: TaskCommentForm,
    @CurrentUser() user: User,
  ): Promise<TaskComment> {
    return this.taskCommentsService.create(data, user)
  }
}
