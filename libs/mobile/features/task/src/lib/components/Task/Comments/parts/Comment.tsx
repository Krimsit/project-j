import { useTheme } from 'styled-components'
import { Card, Avatar, Text } from 'react-native-paper'

import type { FC } from 'react'
import type { CommentProps } from './common.types'

export const Comment: FC<CommentProps> = ({
  avatar,
  username,
  message,
  date,
}) => {
  const theme = useTheme()

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Title
        title={username}
        titleVariant={'titleMedium'}
        left={() => (
          <Avatar.Image
            size={32}
            source={{
              uri: avatar,
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
