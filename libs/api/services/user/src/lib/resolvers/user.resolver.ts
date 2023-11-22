import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'

import { UserInput, User } from '../models'
import { UserService } from '../services'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly testService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.testService.findAll()
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.testService.findOne(id)
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput): Promise<User> {
    return this.testService.create(input)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UserInput,
  ): Promise<User | null> {
    return this.testService.update(id, input)
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User | null> {
    return this.testService.delete(id)
  }
}
