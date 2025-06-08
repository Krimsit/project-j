import { createFileRoute } from '@tanstack/react-router'
import { projectQuery } from '@dto/project'
import { ProjectPage } from '@pages'

export const Route = createFileRoute(
  '/_auth/dashboard/_dashboardLayout/$projectId/',
)({
  loader: ({ context: { queryClient }, params: { projectId } }) => {
    return queryClient.ensureQueryData(projectQuery(projectId))
  },
  component: ProjectPage,
})
