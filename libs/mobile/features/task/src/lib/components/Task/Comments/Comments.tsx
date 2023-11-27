import { Text } from 'react-native-paper'

import { Input, Comment } from './parts'
import { Container } from './Comments.styles'

import type { FC } from 'react'

export const Comments: FC = () => (
  <Container>
    <Text variant={'bodyMedium'}>Comments</Text>
    <Input />
    <Comment
      avatar={
        'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4'
      }
      username={'User 1'}
      message={'Comment 1'}
      date={'25.11.2023'}
    />
    <Comment
      avatar={
        'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4'
      }
      username={'User 1'}
      message={'Comment 1'}
      date={'25.11.2023'}
    />
    <Comment
      avatar={
        'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4'
      }
      username={'User 1'}
      message={'Comment 1'}
      date={'25.11.2023'}
    />
  </Container>
)
