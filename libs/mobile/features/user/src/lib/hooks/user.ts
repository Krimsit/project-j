import { useMutation } from '@apollo/client'
import { deleteUserMutation } from '@shared/queries'

import type { DeleteUserMutationResult } from '@shared/queries'

export const useDeleteUserMutation = () =>
  useMutation<DeleteUserMutationResult>(deleteUserMutation)
