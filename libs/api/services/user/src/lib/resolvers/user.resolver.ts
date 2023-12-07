import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, JwtGuard } from '@api/secure'
import { User } from '@api/models'

import { LoginResult, RegistrationForm, LoginForm } from '../models'
import { UserService } from '../services'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtGuard)
  async currentUser(@CurrentUser() user: User): Promise<User | null> {
    return user
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

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

  @Mutation(() => Boolean)
  @UseGuards(JwtGuard)
  async deleteUser(@CurrentUser() user: User): Promise<boolean> {
    return this.userService.delete(user)
  }
}
