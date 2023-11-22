import { Avatar, Card as BaseCard, Icon, Text } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'
import { TaskPriority, TaskStatus } from '@shared/models'

import { useTaskPriorityIconColor, useTaskStatusIcon } from './TaskCard.utils'
import {
  Card,
  Footer,
  Info,
  InfoChip,
  StatusChip,
  Title,
} from './TaskCard.styles'

import type { FC } from 'react'

export const TaskCard: FC = () => {
  const navigation = useRootNavigation()
  const icon = useTaskStatusIcon(TaskStatus.Done)
  const priorityIconColor = useTaskPriorityIconColor(TaskPriority.High)
  const handleOpenTask = () =>
    navigation.push(Routes.Task, {
      taskId: 'taskId1',
    })

  return (
    <Card onPress={handleOpenTask}>
      <Title
        title={'Task'}
        titleVariant={'titleLarge'}
        left={() => <StatusChip>{icon}</StatusChip>}
      />
      <Info>
        <InfoChip>
          <Icon size={16} source={'calendar-blank'} />
          <Text>26.09.10</Text>
        </InfoChip>
        <InfoChip>
          <Icon size={16} source={'clipboard-list'} />
          <Text>10</Text>
        </InfoChip>
        <InfoChip>
          <Icon size={16} source={'attachment'} />
          <Text>3</Text>
        </InfoChip>
        <InfoChip>
          <Icon size={16} source={'flash'} color={priorityIconColor} />
          <Text>Primary</Text>
        </InfoChip>
      </Info>
      <BaseCard.Actions>
        <Footer>
          <Text variant={'labelLarge'}>Project</Text>
          <Avatar.Image
            size={36}
            source={{
              uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
            }}
          />
        </Footer>
      </BaseCard.Actions>
    </Card>
  )
}
