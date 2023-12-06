import { ActivityIndicator, Text } from 'react-native-paper'

import { useTaskComments } from '../../../hook'

import { Input, Comment } from './parts'
import { Container } from './Comments.styles'

import type { FC } from 'react'

export const Comments: FC = () => {
  const { data, loading } = useTaskComments()

  if (loading) {
    return <ActivityIndicator animating />
  }

  return (
    <Container>
      <Text variant={'bodyMedium'}>Comments</Text>
      <Input />
      {data?.getTaskComments.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </Container>
  )
}
