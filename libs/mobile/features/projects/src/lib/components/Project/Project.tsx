import { ScrollView } from 'react-native'

import { Info } from './Info'
import { Statistics } from './Statistics'
import { Board } from './Board'
import { Container, InfoBlock } from './Project.styles'

import type { FC } from 'react'

export const Project: FC = () => (
  <ScrollView>
    <Container>
      <InfoBlock>
        <Info />
        <Statistics />
      </InfoBlock>
      <Board />
    </Container>
  </ScrollView>
)
