import { useState, useEffect } from 'react'
import { Modal, Button, Checkbox, TextInput, Portal } from 'react-native-paper'

import { Content, List, Footer } from './UserSelect.styles'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { User } from '@shared/models'
import type { UserSelectProps } from './UserSelect.types'

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

export const UserSelect: FC<UserSelectProps> = ({
  isOpen,
  onClose,
  onApply,
  selectedUsers,
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [checkedUsers, setCheckedUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

  const handleClose = () => {
    setSearchValue('')
    setFilteredUsers(users)
    setCheckedUsers([])
    onClose()
  }

  const handleApply = () => {
    onApply(checkedUsers)
    handleClose()
  }

  const handleSearch = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchValue(text)

    const foundedUsers = users.filter(
      (item) =>
        item.username.toLowerCase().includes(text.toLowerCase()) ||
        item.email.toLowerCase().includes(text.toLowerCase()),
    )

    setFilteredUsers(foundedUsers ?? [])
  }

  const handleCheck = (user: User) => () => {
    const id = String(user._id)
    const isUserExist = checkedUsers.find((user) => user._id === id)

    if (isUserExist) {
      const newCheckedUsers = checkedUsers.filter((user) => user._id !== id)

      setCheckedUsers(newCheckedUsers)
    } else {
      setCheckedUsers([...checkedUsers, user])
    }
  }

  useEffect(() => {
    setFilteredUsers(users)
  }, [users, isOpen])

  useEffect(() => {
    if (isOpen) {
      setCheckedUsers(selectedUsers ?? [])
    }
  }, [isOpen, selectedUsers])

  return (
    <Portal>
      <Modal visible={isOpen} onDismiss={handleClose}>
        <Content>
          <TextInput
            mode={'outlined'}
            value={searchValue}
            onChange={handleSearch}
            placeholder={'Find user by username or email'}
          />
          <List>
            {filteredUsers.map((user) => {
              const isUserExist = checkedUsers.find(
                (item) => item._id === user._id,
              )
              const status = isUserExist ? 'checked' : 'unchecked'

              return (
                <Checkbox.Item
                  key={String(user._id)}
                  status={status}
                  label={user.username}
                  onPress={handleCheck(user)}
                />
              )
            })}
          </List>
          <Footer>
            <Button mode={'outlined'} onPress={handleClose}>
              Close
            </Button>
            <Button mode={'contained'} onPress={handleApply}>
              Apply
            </Button>
          </Footer>
        </Content>
      </Modal>
    </Portal>
  )
}
