import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Chip, Avatar } from 'react-native-paper'
import { Select } from '@mobile/ui'

import { Button } from './common.styles'

import type { FC } from 'react'
import type { User } from '@shared/models'

const users: User[] = [
  {
    _id: '1',
    username: 'User 1',
    email: 'test@test.com',
    createdAt: '',
    password: '',
  },
  {
    _id: '2',
    username: 'User 2',
    email: 'test@test.com',
    createdAt: '',
    password: '',
  },
  {
    _id: '3',
    username: 'User 3',
    email: 'test@test.com',
    createdAt: '',
    password: '',
  },
  {
    _id: '4',
    username: 'User 4',
    email: 'test@test.com',
    createdAt: '',
    password: '',
  },
  {
    _id: '5',
    username: 'User 5',
    email: 'test@test.com',
    createdAt: '',
    password: '',
  },
]

export const UserSelect: FC = () => {
  const { setValue } = useFormContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedUser, setCheckedUser] = useState<User | undefined>(undefined)

  const handleApply = (user?: User) => {
    setCheckedUser(user)
    setValue('assigner', user)
  }
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

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
        values={users}
        valueField={'_id'}
        labelField={'username'}
        searchField={'username'}
        value={checkedUser}
      />
    </View>
  )
}
