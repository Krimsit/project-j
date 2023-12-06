import { useTheme } from 'styled-components'
import { Card, Avatar, Text } from 'react-native-paper'
import { useMemo } from 'react'
import dayjs from 'dayjs'

import type { FC } from 'react'
import type { TaskComment } from '@shared/models'

export const Comment: FC<TaskComment> = ({ user, message, createdAt }) => {
  const theme = useTheme()
  const date = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    () => String(dayjs(new Date(createdAt)).format('DD.MM.YYYY')),
    [createdAt],
  )

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Title
        title={user.username}
        titleVariant={'titleMedium'}
        left={() => (
          <Avatar.Image
            size={32}
            source={{
              uri: user.avatar,
            }}
          />
        )}
      />
      <Card.Content>
        <Text>{message}</Text>
      </Card.Content>
      <Card.Actions>
        <Text>{date}</Text>
      </Card.Actions>
    </Card>
  )
}
