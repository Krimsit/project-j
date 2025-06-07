import { Controller, Get } from '@nestjs/common'

import { TestService } from '../services'

import type { TestResponse } from '@shared/types'

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): TestResponse {
    return this.testService.getHello()
  }
}
