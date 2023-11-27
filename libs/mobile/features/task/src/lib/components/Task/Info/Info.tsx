import { Text } from 'react-native-paper'

import { Status, Assigner, DueDate, Priority } from './parts'
import { Container } from './Info.styles'

import type { FC } from 'react'

export const Info: FC = () => (
  <Container>
    <Status />
    <Assigner />
    <DueDate />
    <Priority />
    <Text>
      DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
    </Text>
  </Container>
)
