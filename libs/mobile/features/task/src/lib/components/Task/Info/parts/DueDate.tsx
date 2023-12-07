import { Chip } from 'react-native-paper'
import { parseDate } from '@mobile/ui'

import { useTaskQuery } from '../../../../hooks'

import { Row } from './Row'

import type { FC } from 'react'

export const DueDate: FC = () => {
  const { data } = useTaskQuery()

  if (!data) {
    return null
  }

  const { dueData } = data.getTask
  const formattedDueDate = parseDate(dueData)

  return (
    <Row title={'Due date'}>
      <Chip mode={'outlined'} icon={'calendar'}>
        {formattedDueDate}
      </Chip>
    </Row>
  )
}
