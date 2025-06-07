import {
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common'
import { authEndpoints } from '@shared/api'
import { AuthService } from '@services'
import { LocalAuthGuard, GoogleAuthGuard } from '@secure'

import type { RegistrationRequest, LoginResponse } from '@shared/types'
import type { UserDocument } from '@models'

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post(authEndpoints.registration)
  async register(@Body() params: RegistrationRequest): Promise<LoginResponse> {
    return this.authService.register(params)
  }

  @UseGuards(LocalAuthGuard)
  @Post(authEndpoints.login)
  async login(@Request() req: { user: UserDocument }): Promise<LoginResponse> {
    return this.authService.login(req.user)
  }

  @UseGuards(GoogleAuthGuard)
  @Post(authEndpoints.loginGoogle)
  async loginWithGoogle(
    @Request() req: { user: UserDocument },
  ): Promise<LoginResponse> {
    return this.authService.login(req.user)
  }
}
