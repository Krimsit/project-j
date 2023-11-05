import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { UserModule } from '@api/user'

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: '/user',
        module: UserModule,
      },
    ]),
  ],
})
export class AppModule {}
