import { Title } from './Title'
import { Info } from './Info'
import { Attachments } from './Attachments'
import { Comments } from './Comments'
import { Container } from './Task.styles'

import type { FC } from 'react'

export const Task: FC = () => (
  <Container>
    <Title />
    <Info />
    <Attachments />
    <Comments />
  </Container>
)
