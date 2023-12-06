import { RouterModule } from '@nestjs/core'
import { UserModule } from '@api/user'
import { ProjectsModule } from '@api/projects'
import { TasksModule } from '@api/tasks'
import { TaskCommentsModule } from '@api/task-comments'
import { ApiSelectModule } from '@api/api-select'

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
  {
    path: '/task-comments',
    module: TaskCommentsModule,
  },
  {
    path: '/api-select',
    module: ApiSelectModule,
  },
])
