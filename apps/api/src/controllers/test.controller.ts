import { Controller, Get } from '@nestjs/common'

import { TestService } from '../services'

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    return this.testService.getHello()
  }
}
