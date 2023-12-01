import { useState, useEffect } from 'react'
import { Avatar, IconButton } from 'react-native-paper'
import { useAllUsersQuery } from '@mobile/hooks'
import { MultiSelect } from '@mobile/ui'

import {
  useProjectQuery,
  useUpdateProjectUsersMutation,
} from '../../../../hook'

import { PeoplesContainer } from './common.styles'

import type { FC } from 'react'
import type { User } from '@shared/models'

export const Peoples: FC = () => {
  const { data: allUsers } = useAllUsersQuery()
  const [updateProjectUsers, { loading }] = useUpdateProjectUsersMutation()
  const { data } = useProjectQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleApply = async (users: User[]) => {
    const ids = users.map((item) => item._id)

    void updateProjectUsers({
      variables: {
        value: {
          project_id: data?.getProject._id || '',
          users: ids,
        },
      },
    }).then(() => handleClose())
  }

  if (!data) {
    return null
  }

  const { users } = data.getProject

  return (
    <PeoplesContainer>
      {users?.map((item) => (
        <Avatar.Image
          key={item._id}
          source={{
            uri: item.avatar,
          }}
          size={32}
        />
      ))}
      <IconButton
        icon={'account-multiple-plus'}
        mode={'contained'}
        size={16}
        onPress={handleOpen}
      />
      <MultiSelect<User>
        isOpen={isOpen}
        onApply={handleApply}
        onClose={handleClose}
        values={allUsers?.getAllUsers ?? []}
        valueField={'_id'}
        labelField={'username'}
        searchField={'username'}
        value={users}
        loading={loading}
      />
    </PeoplesContainer>
  )
}
