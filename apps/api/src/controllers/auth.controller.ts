import {
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Body,
  InternalServerErrorException,
} from '@nestjs/common'
import { authEndpoints } from '@shared/api'
import { AuthService } from '@services'
import { LocalAuthGuard, GoogleAuthGuard } from '@secure'

import type {
  RegistrationRequest,
  RegistrationResponse,
  LoginResponse,
  LoginGoogleResponse,
} from '@shared/types'
import type { CreateUserReturn } from '@services'
import type { UserDocument } from '@models'

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post(authEndpoints.registration)
  async register(
    @Body() params: RegistrationRequest,
  ): Promise<RegistrationResponse> {
    const registrationResponse = await this.authService.register(params)

    if (!registrationResponse) {
      throw new InternalServerErrorException('An error occurred')
    }

    return registrationResponse
  }

  @UseGuards(LocalAuthGuard)
  @Post(authEndpoints.login)
  async login(@Request() req: { user: UserDocument }): Promise<LoginResponse> {
    return this.authService.login(req.user)
  }

  @UseGuards(GoogleAuthGuard)
  @Post(authEndpoints.loginGoogle)
  async loginWithGoogle(
    @Request() req: { user: CreateUserReturn },
  ): Promise<LoginGoogleResponse> {
    const loginResponse = await this.authService.login(req.user.createdUser)

    return {
      ...loginResponse,
      defaultProjectId: req.user.defaultProject?.id,
    }
  }
}
