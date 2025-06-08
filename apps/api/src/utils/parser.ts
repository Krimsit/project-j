import type { UserProfile, ProjectResponse } from '@shared/types'
import type { UserDocument, ProjectDocument } from '@models'

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
