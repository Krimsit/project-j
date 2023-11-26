import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Chip, Icon } from 'react-native-paper'
import { Select, useTaskPriorityIconColor } from '@mobile/ui'
import { TaskPriority } from '@shared/models'

import { Button } from './common.styles'

import type { FC } from 'react'
import type { PriorityItem } from '@shared/models'

const priorities: PriorityItem[] = [
  {
    value: TaskPriority.Low,
    label: TaskPriority.Low,
  },
  {
    value: TaskPriority.Medium,
    label: TaskPriority.Medium,
  },
  {
    value: TaskPriority.High,
    label: TaskPriority.High,
  },
]

export const PrioritySelect: FC = () => {
  const { setValue } = useFormContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedPriority, setCheckedPriority] = useState<
    PriorityItem | undefined
  >(undefined)
  const priorityColor = useTaskPriorityIconColor(checkedPriority?.value)

  const handleApply = (priority?: PriorityItem) => {
    setCheckedPriority(priority)
    setValue('priority', priority)
  }
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <View>
      {checkedPriority ? (
        <Chip
          key={String(checkedPriority.value)}
          mode={'outlined'}
          onPress={handleOpen}
          icon={() => <Icon size={16} source={'flash'} color={priorityColor} />}
          closeIcon={'arrow-down-bold-circle'}
          onClose={handleOpen}
        >
          {checkedPriority.label}
        </Chip>
      ) : (
        <Button mode={'outlined'} onPress={handleOpen}>
          Select priority
        </Button>
      )}
      <Select<PriorityItem>
        isOpen={isOpen}
        onApply={handleApply}
        onClose={handleClose}
        values={priorities}
        valueField={'value'}
        labelField={'label'}
        value={checkedPriority}
      />
    </View>
  )
}
