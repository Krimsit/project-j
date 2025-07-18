import { Controller, UseGuards, Get } from '@nestjs/common'
import { userEndpoints } from '@shared/api'
import { JwtAuthGuard } from '@secure'
import { UserDecorator } from '@decorators'
import { parseUserResponse } from '@utils'

import type { UserProfile } from '@shared/types'
import type { UserDocument } from '@models'

@Controller()
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get(userEndpoints.profile)
  async getProfile(@UserDecorator() user: UserDocument): Promise<UserProfile> {
    return parseUserResponse(user)
  }
}
