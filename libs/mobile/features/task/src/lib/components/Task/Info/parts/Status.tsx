import { useState } from 'react'
import { View } from 'react-native'
import { Chip, Icon } from 'react-native-paper'
import { Select, useTaskStatusColor, useTaskStatusIcon } from '@mobile/ui'
import { TaskStatus } from '@shared/models'

import { Row } from './Row'

import type { FC } from 'react'
import type { TaskStatusItem } from '@shared/models'

const statuses: TaskStatusItem[] = [
  {
    value: TaskStatus.InProgress,
    label: 'In Progress',
  },
]

export const Status: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedStatus, setCheckedStatus] = useState<
    TaskStatusItem | undefined
  >({
    value: TaskStatus.ToDo,
    label: 'ToDo',
  })
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const color = useTaskStatusColor(checkedStatus?.value ?? TaskStatus.ToDo)
  const icon = useTaskStatusIcon(checkedStatus?.value ?? TaskStatus.ToDo, 16)

  const handleApply = (status?: TaskStatusItem) => {
    setCheckedStatus(status)
    console.log(status)
  }

  return (
    <Row title={'Status'}>
      <View>
        <Chip
          mode={'outlined'}
          onPress={handleOpen}
          selectedColor={color}
          icon={() => icon}
        >
          {checkedStatus?.label}
        </Chip>
        <Select<TaskStatusItem>
          isOpen={isOpen}
          onApply={handleApply}
          onClose={handleClose}
          values={statuses}
          valueField={'value'}
          labelField={'label'}
          value={checkedStatus}
        />
      </View>
    </Row>
  )
}
