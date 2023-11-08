import { Module } from '@nestjs/common'
import {
  apiRoutes,
  configModule,
  graphQLModule,
  mongooseModule,
  services,
} from '@api/configs'

@Module({
  imports: [
    ...services,
    apiRoutes,
    configModule,
    graphQLModule,
    mongooseModule,
  ],
})
export class AppModule {}
