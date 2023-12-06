import { UserModule } from '@api/user'
import { ProjectsModule } from '@api/projects'
import { TasksModule } from '@api/tasks'
import { TaskCommentsModule } from '@api/task-comments'
import { ApiSelectModule } from '@api/api-select'

export const services = [
  UserModule,
  ProjectsModule,
  TasksModule,
  TaskCommentsModule,
  ApiSelectModule
]
