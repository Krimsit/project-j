import { UserModule } from '@api/user'
import { ProjectsModule } from '@api/projects'
import { TasksModule } from '@api/tasks'
import { TaskCommentsModule } from '@api/task-comments'

export const services = [
  UserModule,
  ProjectsModule,
  TasksModule,
  TaskCommentsModule,
]
