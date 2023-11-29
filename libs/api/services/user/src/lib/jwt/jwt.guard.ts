import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-core'

import type { ExecutionContext } from '@nestjs/common'
import type { User } from '../models'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext<{ req: { user: User } }>()

    return req
  }

  override handleRequest<User>(error: Error, user: User) {
    if (error || !user) {
      throw (
        error || new AuthenticationError('Could not authenticate with token')
      )
    }

    return user
  }
}
