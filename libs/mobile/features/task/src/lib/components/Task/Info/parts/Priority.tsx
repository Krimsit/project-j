import { Chip, Icon } from 'react-native-paper'
import { useTaskPriorityIconColor } from '@mobile/ui'
import { TaskPriority } from '@shared/models'

import { Row } from './Row'

import type { FC } from 'react'
import type { PriorityItem } from '@shared/models'

const priority: PriorityItem = {
  value: TaskPriority.High,
  label: TaskPriority.High,
}

export const Priority: FC = () => {
  const priorityColor = useTaskPriorityIconColor(priority.value)

  return (
    <Row title={'Priority'}>
      <Chip
        key={String(priority.value)}
        mode={'outlined'}
        icon={() => <Icon size={16} source={'flash'} color={priorityColor} />}
      >
        {priority.label}
      </Chip>
    </Row>
  )
}
