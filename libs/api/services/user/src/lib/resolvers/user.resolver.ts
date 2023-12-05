import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, JwtGuard } from '@api/secure'
import { User } from '@api/models'

import { LoginResult, RegistrationForm, LoginForm } from '../models'
import { UserService } from '../services'

import type { UserDocument } from '../models'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => LoginResult)
  async registration(
    @Args('data') data: RegistrationForm,
  ): Promise<LoginResult> {
    return this.userService.registration(data)
  }

  @Mutation(() => LoginResult)
  async login(@Args('data') data: LoginForm): Promise<LoginResult> {
    return await this.userService.login(data)
  }

  @Query(() => String)
  async refreshToken(
    @Context('req') request: { user: UserDocument },
  ): Promise<string> {
    const { user } = request

    return this.userService.refreshToken(user)
  }

  @Query(() => User)
  @UseGuards(JwtGuard)
  async currentUser(@CurrentUser() user: User): Promise<User | null> {
    return user
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGuard)
  async deleteUser(@CurrentUser() user: User): Promise<boolean> {
    return this.userService.delete(user)
  }
}
