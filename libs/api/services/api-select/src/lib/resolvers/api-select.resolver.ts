import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { ApiSelectService } from '../services'

@Resolver()
export class ApiSelectResolver {
  constructor(private readonly apiSelectService: ApiSelectService) {}

  @Mutation(() => Boolean)
  isValidSecretKey(@Args('apiKey') apiKey: string): boolean {
    return this.apiSelectService.isValidSecretKey(apiKey)
  }
}
