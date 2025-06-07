import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import type { User, UserDocument } from '@models'

export const UserDecorator = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    if (data) {
      return request.user?.[data]
    }

    return request.user as UserDocument
  },
)
