import { createFileRoute } from '@tanstack/react-router'
import { boardQuery } from '@dto/board'
import { BoardPage } from '@pages'

export const Route = createFileRoute(
  '/_auth/dashboard/_dashboardLayout/$projectId/boards/$boardId/',
)({
  loader: ({ context: { queryClient }, params: { boardId } }) => {
    return queryClient.ensureQueryData(boardQuery(boardId))
  },
  component: BoardPage,
})
