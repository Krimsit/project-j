import { RouterModule } from '@nestjs/core'
import { UserModule } from '@api/user'

export const apiRoutes = RouterModule.register([
  {
    path: '/user',
    module: UserModule,
  },
])
