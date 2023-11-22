import { useTheme } from 'styled-components'
import { Card, Avatar } from 'react-native-paper'

import type { FC } from 'react'

export const User: FC = () => {
  const theme = useTheme()

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Title
        left={() => (
          <Avatar.Image
            source={{
              uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
            }}
            size={50}
          />
        )}
        title={'Welcome, User!'}
        titleVariant={'titleLarge'}
        titleNumberOfLines={3}
        subtitle={'@user'}
        subtitleNumberOfLines={2}
      />
    </Card>
  )
}
