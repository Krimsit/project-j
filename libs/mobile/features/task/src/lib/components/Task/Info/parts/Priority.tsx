import { Chip, Icon } from 'react-native-paper'
import { useTaskPriorityIconColor } from '@mobile/ui'
import { TaskPriority } from '@shared/models'
import { tasksPriority } from '@shared/constants'

import { useTaskQuery } from '../../../../hooks'

import { Row } from './Row'

import type { FC } from 'react'

export const Priority: FC = () => {
  const { data } = useTaskQuery()
  const priority = data?.getTask.priority ?? TaskPriority.Low
  const priorityColor = useTaskPriorityIconColor(priority)
  const { label } = tasksPriority[priority]

  return (
    <Row title={'Priority'}>
      <Chip
        mode={'outlined'}
        icon={() => <Icon size={16} source={'flash'} color={priorityColor} />}
      >
        {label}
      </Chip>
    </Row>
  )
}
