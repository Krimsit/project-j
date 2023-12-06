import { RouterModule } from '@nestjs/core'
import { UserModule } from '@api/user'
import { ProjectsModule } from '@api/projects'
import { TasksModule } from '@api/tasks'
import { TaskCommentsModule } from '@api/task-comments'

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
])
