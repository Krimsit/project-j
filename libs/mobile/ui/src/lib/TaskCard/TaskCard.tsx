import { useTheme } from 'styled-components'
import { Avatar, Card as BaseCard, Icon, Text } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { useTaskPriorityIconColor, useTaskStatusIcon } from './TaskCard.utils'
import { Footer, Info, InfoChip, StatusChip, Title } from './TaskCard.styles'

import type { FC } from 'react'
import type { TaskCardProps } from './TaskCard.types'

export const TaskCard: FC<TaskCardProps> = ({
  _id,
  assignedTasksCount,
  attachmentsCount,
  assignerAvatar,
  name,
  projectName,
  status,
  dueDate,
  priority,
}) => {
  const theme = useTheme()
  const navigation = useRootNavigation()
  const icon = useTaskStatusIcon(status)
  const priorityIconColor = useTaskPriorityIconColor(priority)
  const handleOpenTask = () =>
    navigation.push(Routes.Task, {
      taskId: _id,
    })

  return (
    <BaseCard
      onPress={handleOpenTask}
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Title
        title={name}
        titleVariant={'titleLarge'}
        left={() => <StatusChip>{icon}</StatusChip>}
      />
      <Info>
        <InfoChip>
          <Icon size={16} source={'calendar-blank'} />
          <Text>{dueDate}</Text>
        </InfoChip>
        {Boolean(assignedTasksCount) && (
          <InfoChip>
            <Icon size={16} source={'clipboard-list'} />
            <Text>{assignedTasksCount}</Text>
          </InfoChip>
        )}
        {Boolean(attachmentsCount) && (
          <InfoChip>
            <Icon size={16} source={'attachment'} />
            <Text>{attachmentsCount}</Text>
          </InfoChip>
        )}
        <InfoChip>
          <Icon size={16} source={'flash'} color={priorityIconColor} />
          <Text>{priority}</Text>
        </InfoChip>
      </Info>
      <BaseCard.Actions>
        <Footer>
          <Text variant={'labelLarge'}>{projectName}</Text>
          <Avatar.Image
            size={36}
            source={{
              uri: assignerAvatar,
            }}
          />
        </Footer>
      </BaseCard.Actions>
    </BaseCard>
  )
}
