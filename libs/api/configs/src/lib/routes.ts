import { RouterModule } from '@nestjs/core'
import { UserModule } from '@api/user'
import { ProjectsModule } from '@api/projects'
import { TasksModule } from '@api/tasks'

export const apiRoutes = RouterModule.register([
  {
    path: '/user',
    module: UserModule,
  },
  {
    path: '/projects',
    module: ProjectsModule,
  },
  {
    path: '/tasks',
    module: TasksModule,
  },
])
