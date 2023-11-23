import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Button, Chip, Avatar, HelperText } from 'react-native-paper'

import { UserSelect as UserSelectModal } from '../../../UserSelect'

import { CheckedUsersContainer, CheckedUsers } from './common.styles'

import type { FC } from 'react'
import type { User } from '@shared/models'

export const UserSelect: FC = () => {
  const { setValue } = useFormContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedUsers, setCheckedUsers] = useState<User[]>([])

  const handleApply = (users: User[]) => {
    setCheckedUsers(users)
    setValue('users', users)
  }
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

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
        <UserSelectModal
          isOpen={isOpen}
          onApply={handleApply}
          onClose={handleClose}
          selectedUsers={checkedUsers}
        />
      </CheckedUsersContainer>
    </View>
  )
}
