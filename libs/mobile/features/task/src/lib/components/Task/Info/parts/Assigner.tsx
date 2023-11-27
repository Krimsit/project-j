import { useState } from 'react'
import { View } from 'react-native'
import { Chip, Avatar } from 'react-native-paper'
import { Select } from '@mobile/ui'

import { Row } from './Row'

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

export const Assigner: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedUser, setCheckedUser] = useState<User | undefined>({
    _id: '1',
    username: 'User 1',
    email: 'test@test.com',
    createdAt: '',
    password: '',
  })
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleApply = (user?: User) => {
    setCheckedUser(user)
    console.log(user)
  }

  return (
    <Row title={'Assigner'}>
      <View>
        <Chip
          mode={'outlined'}
          avatar={
            <Avatar.Image
              size={24}
              source={{
                uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
              }}
            />
          }
          onPress={handleOpen}
        >
          {checkedUser?.username}
        </Chip>
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
    </Row>
  )
}
