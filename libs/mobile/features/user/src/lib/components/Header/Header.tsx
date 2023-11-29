import { Text, Avatar } from 'react-native-paper'
import { useUserQuery } from '@mobile/hooks'

import { Container } from './Header.styles'

import type { FC } from 'react'

export const Header: FC = () => {
  const { data } = useUserQuery()

  if (!data) {
    return null
  }

  const {
    currentUser: { last_name, first_name, username, avatar },
  } = data

  return (
    <Container>
      <Avatar.Image
        size={80}
        source={{
          uri: avatar,
        }}
      />
      <Text variant={'titleLarge'}>
        {last_name} {first_name}
      </Text>
      <Text variant={'titleSmall'}>@{username}</Text>
    </Container>
  )
}
