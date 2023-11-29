import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import type { ExecutionContext } from '@nestjs/common'
import type { User } from '@shared/models'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext<{ req: { user: User } }>()

    return req.user
  },
)
