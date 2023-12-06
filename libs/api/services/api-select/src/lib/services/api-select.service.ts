import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { ConfigServiceProps } from '@api/models'

@Injectable()
export class ApiSelectService {
  constructor(private configService: ConfigService<ConfigServiceProps>) {}

  isValidSecretKey(key: string): boolean {
    const apiSecretKey = this.configService.get<string>('API_SECRET_KEY')
    const isValid = key === apiSecretKey

    if (!isValid) {
      throw new ForbiddenException('You have not permissions')
    }

    return true
  }
}
