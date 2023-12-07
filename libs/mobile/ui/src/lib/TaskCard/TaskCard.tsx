import { useTheme } from 'styled-components'
import { Avatar, Card as BaseCard, Icon, Text } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'
import { tasksPriority } from '@shared/constants'

import {
  useTaskPriorityIconColor,
  useTaskStatusIcon,
  parseDate,
} from './TaskCard.utils'
import { Footer, Info, InfoChip, StatusChip, Title } from './TaskCard.styles'

import type { FC } from 'react'
import type { TaskCardProps } from './TaskCard.types'

export const TaskCard: FC<TaskCardProps> = ({
  _id,
  name,
  assigner,
  attachments,
  dueData,
  priority,
  status,
  project,
}) => {
  const theme = useTheme()
  const navigation = useRootNavigation()
  const icon = useTaskStatusIcon(status)
  const priorityIconColor = useTaskPriorityIconColor(priority)
  const priorityLabel = tasksPriority[priority].label
  const formattedDueDate = parseDate(dueData)
  const handleOpenTask = () =>
    navigation.navigate(Routes.Task, {
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
          <Text>{formattedDueDate}</Text>
        </InfoChip>
        {attachments.length !== 0 && (
          <InfoChip>
            <Icon size={16} source={'attachment'} />
            <Text>{attachments.length}</Text>
          </InfoChip>
        )}
        <InfoChip>
          <Icon size={16} source={'flash'} color={priorityIconColor} />
          <Text>{priorityLabel}</Text>
        </InfoChip>
      </Info>
      <BaseCard.Actions>
        <Footer>
          <Text variant={'labelLarge'}>{project.name}</Text>
          <Avatar.Image
            size={36}
            source={{
              uri: assigner.avatar,
            }}
          />
        </Footer>
      </BaseCard.Actions>
    </BaseCard>
  )
}
