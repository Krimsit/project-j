import { Text, Avatar } from 'react-native-paper'

import { Container } from './Header.styles'

import type { FC } from 'react'

export const Header: FC = () => (
  <Container>
    <Avatar.Image
      size={48}
      source={{
        uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
      }}
    />
    <Text variant={'titleLarge'}>User</Text>
    <Text variant={'titleSmall'}>test@test.com</Text>
  </Container>
)
