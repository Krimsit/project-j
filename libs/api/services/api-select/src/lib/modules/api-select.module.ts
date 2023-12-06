import { Module } from '@nestjs/common'

import { ApiSelectResolver } from '../resolvers'
import { ApiSelectService } from '../services'

@Module({
  providers: [ApiSelectService, ApiSelectResolver],
  imports: [],
})
export class ApiSelectModule {}
