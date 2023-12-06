import { useTheme } from 'styled-components'
import { Card, Avatar } from 'react-native-paper'
import { useUserQuery } from '@mobile/hooks'

import type { FC } from 'react'

export const User: FC = () => {
  const theme = useTheme()
  const { data } = useUserQuery()

  if (!data) {
    return null
  }

  const { avatar, first_name, last_name, username } = data.currentUser

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Title
        left={() => (
          <Avatar.Image
            source={{
              uri: avatar,
            }}
            size={50}
          />
        )}
        title={`Welcome, ${last_name} ${first_name}!`}
        titleVariant={'titleMedium'}
        titleNumberOfLines={3}
        subtitle={`@${username}`}
        subtitleNumberOfLines={2}
      />
    </Card>
  )
}
