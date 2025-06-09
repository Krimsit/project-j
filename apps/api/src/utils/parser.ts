import type {
  UserProfile,
  ProjectResponse,
  BoardResponse,
  TaskResponse,
  TaskCardResponse,
} from '@shared/types'
import type {
  UserDocument,
  ProjectDocument,
  BoardDocument,
  TaskDocument,
} from '@models'

export const parseUserResponse = (user: UserDocument): UserProfile => ({
  id: user.id,
  email: user.email,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  midName: user.midName,
  avatar: user.avatar?.url,
})

export const parseProjectResponse = (
  project: ProjectDocument,
): ProjectResponse => ({
  id: project.id,
  name: project.name,
  description: project.description,
  gradient: project.gradient,
  cover: project.cover?.id,
  owner: parseUserResponse(project.owner),
})

export const parseBoardResponse = (board: BoardDocument): BoardResponse => ({
  id: board.id,
  name: board.name,
  description: board.description,
  owner: parseUserResponse(board.owner),
})

export const parseTaskResponse = (task: TaskDocument): TaskResponse => ({
  id: task.id,
  name: task.name,
  description: task.description,
  status: task.status,
  dueDate: task.dueDate,
  assigner: parseUserResponse(task.assigner),
  files: [],
})

export const parseTaskCardResponse = (
  task: TaskDocument,
): TaskCardResponse => ({
  id: task.id,
  name: task.name,
  status: task.status,
  dueDate: task.dueDate,
  assigner: parseUserResponse(task.assigner),
})
