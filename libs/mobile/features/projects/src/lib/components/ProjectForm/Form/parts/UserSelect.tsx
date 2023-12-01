import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Button, Chip, Avatar, HelperText } from 'react-native-paper'
import { useAllUsersQuery } from '@mobile/hooks'
import { MultiSelect } from '@mobile/ui'

import { CheckedUsersContainer, CheckedUsers } from './common.styles'

import type { FC } from 'react'
import type { User, ProjectForm } from '@shared/models'
import type { ProjectFormRouterProps } from '../../../../types'

export const UserSelect: FC = () => {
  const router = useRoute<ProjectFormRouterProps>()
  const { data: allUsers } = useAllUsersQuery()
  const { setValue } = useFormContext<ProjectForm>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedUsers, setCheckedUsers] = useState<User[]>([])

  const handleApply = (users: User[]) => {
    const ids = users.map((user) => user._id)

    setCheckedUsers(users)
    setValue('users', ids)
  }
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    setCheckedUsers(router.params.defaultValues?.users ?? [])
  }, [router.params.defaultValues?.users])

  return (
    <View>
      <HelperText type={'info'}>Users</HelperText>
      <CheckedUsersContainer>
        <CheckedUsers>
          {checkedUsers.map((item) => (
            <Chip
              key={String(item._id)}
              mode={'flat'}
              avatar={
                <Avatar.Image
                  source={{
                    uri: item.username,
                  }}
                />
              }
            >
              {item.username}
            </Chip>
          ))}
        </CheckedUsers>
        <Button mode={'contained'} onPress={handleOpen}>
          Select users
        </Button>
        <MultiSelect<User>
          isOpen={isOpen}
          onApply={handleApply}
          onClose={handleClose}
          values={allUsers?.getAllUsers ?? []}
          valueField={'_id'}
          labelField={'username'}
          searchField={'username'}
          value={checkedUsers}
        />
      </CheckedUsersContainer>
    </View>
  )
}
