import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Chip, Avatar } from 'react-native-paper'
import { useAllUsersQuery } from '@mobile/hooks'
import { Select } from '@mobile/ui'

import { Button } from './common.styles'

import type { FC } from 'react'
import type { User, TaskForm } from '@shared/models'

export const UserSelect: FC = () => {
  const { data: allUsers } = useAllUsersQuery()
  const { setValue, getValues } = useFormContext<TaskForm>()
  const value = getValues('assigner') as string
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedUser, setCheckedUser] = useState<User | undefined>(undefined)

  const handleApply = (user?: User) => {
    if (user) {
      setCheckedUser(user)
      setValue('assigner', user._id, {
        shouldValidate: true,
      })
    }
  }
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    if (value) {
      const foundedUser = allUsers?.getAllUsers.find(
        (item) => item._id === value,
      )

      if (foundedUser) {
        setCheckedUser(foundedUser)
      }
    }
  }, [allUsers?.getAllUsers, value])

  return (
    <View>
      {checkedUser ? (
        <Chip
          key={String(checkedUser._id)}
          mode={'outlined'}
          avatar={
            <Avatar.Image
              source={{
                uri: checkedUser.username,
              }}
            />
          }
          onPress={handleOpen}
        >
          {checkedUser.username}
        </Chip>
      ) : (
        <Button mode={'outlined'} onPress={handleOpen}>
          Select assigner
        </Button>
      )}
      <Select<User>
        isOpen={isOpen}
        onApply={handleApply}
        onClose={handleClose}
        values={allUsers?.getAllUsers ?? []}
        valueField={'_id'}
        labelField={'username'}
        searchField={'username'}
        value={checkedUser}
      />
    </View>
  )
}
