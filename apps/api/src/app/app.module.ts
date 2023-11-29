import { Module } from '@nestjs/common'
import {
  apiRoutes,
  configModule,
  graphQLModule,
  mongooseModule,
  services,
} from '@api/configs'
import { FirebaseModule } from '@api/firebase'

@Module({
  imports: [
    ...services,
    apiRoutes,
    configModule,
    graphQLModule,
    mongooseModule,
    FirebaseModule,
  ],
})
export class AppModule {}
