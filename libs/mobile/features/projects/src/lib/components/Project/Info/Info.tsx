import { useTheme } from 'styled-components'
import { Avatar, Card } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { useProjectQuery } from '../../../hooks'

import { Peoples } from './parts'
import { AddTaskButton } from './Info.styles'

import type { FC } from 'react'

export const Info: FC = () => {
  const theme = useTheme()
  const navigation = useRootNavigation()
  const { data } = useProjectQuery()

  const handleOpenTaskForm = () => {
    navigation.navigate(Routes.TaskForm, {
      project_id: data?.getProject._id ?? '',
    })
  }

  if (!data) {
    return null
  }

  const { image, owner, name } = data.getProject

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Cover
        source={{
          uri: image,
        }}
      />
      <Card.Title
        title={name}
        titleVariant={'titleLarge'}
        titleNumberOfLines={5}
        left={() => (
          <Avatar.Image
            source={{
              uri: owner.avatar,
            }}
            size={32}
          />
        )}
      />
      <Card.Content>
        <Peoples />
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
