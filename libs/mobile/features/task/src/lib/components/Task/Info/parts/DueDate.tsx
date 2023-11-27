import { Chip } from 'react-native-paper'

import { Row } from './Row'

import type { FC } from 'react'

export const DueDate: FC = () => (
  <Row title={'Due date'}>
    <Chip mode={'outlined'} icon={'calendar'}>
      25.11.2023
    </Chip>
  </Row>
)
