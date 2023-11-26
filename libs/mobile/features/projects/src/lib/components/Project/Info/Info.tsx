import { useTheme } from 'styled-components'
import { Avatar, Card } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { Peoples } from './parts'
import { AddTaskButton } from './Info.styles'

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
]

export const Info: FC = () => {
  const theme = useTheme()
  const navigation = useRootNavigation()

  const handleOpenTaskForm = () => {
    navigation.navigate(Routes.TaskForm, {
      project_id: '1',
    })
  }

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Cover
        source={{
          uri: 'https://fastly.picsum.photos/id/661/700/700.jpg?hmac=5JIdMAlFpi9buG1brZ-L0gMljQkKHMiFDwiNZVIduUc',
        }}
      />
      <Card.Title
        title={'Project'}
        titleVariant={'titleLarge'}
        titleNumberOfLines={5}
        left={() => (
          <Avatar.Image
            source={{
              uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
            }}
            size={32}
          />
        )}
      />
      <Card.Content>
        <Peoples peoples={users} />
      </Card.Content>
      <Card.Actions>
        <AddTaskButton
          icon={'clipboard-plus-outline'}
          mode={'contained'}
          onPress={handleOpenTaskForm}
        >
          Create Task
        </AddTaskButton>
      </Card.Actions>
    </Card>
  )
}
