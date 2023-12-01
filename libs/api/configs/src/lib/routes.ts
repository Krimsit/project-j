import { RouterModule } from '@nestjs/core'
import { UserModule } from '@api/user'
import { ProjectsModule } from '@api/projects'

export const apiRoutes = RouterModule.register([
  {
    path: '/user',
    module: UserModule,
  },
  {
    path: '/projects',
    module: ProjectsModule,
  },
])
