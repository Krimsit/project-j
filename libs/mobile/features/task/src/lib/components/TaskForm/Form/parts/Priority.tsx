import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Chip, Icon } from 'react-native-paper'
import { Select, useTaskPriorityIconColor } from '@mobile/ui'
import { tasksPriority } from '@shared/constants'

import { Button } from './common.styles'

import type { FC } from 'react'
import type { TaskPriorityItem, TaskForm } from '@shared/models'

export const PrioritySelect: FC = () => {
  const { setValue, getValues } = useFormContext<TaskForm>()
  const value = getValues('priority')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedPriority, setCheckedPriority] = useState<
    TaskPriorityItem | undefined
  >(undefined)
  const priorityColor = useTaskPriorityIconColor(checkedPriority?.value)

  const handleApply = (priority?: TaskPriorityItem) => {
    if (priority) {
      setCheckedPriority(priority)
      setValue('priority', priority.value, {
        shouldValidate: true,
      })
    }
  }
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    const foundedPriority = tasksPriority.find((item) => item.value === value)

    setCheckedPriority(foundedPriority)
  }, [value])

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
      <Select<TaskPriorityItem>
        isOpen={isOpen}
        onApply={handleApply}
        onClose={handleClose}
        values={tasksPriority}
        valueField={'value'}
        labelField={'label'}
        value={checkedPriority}
      />
    </View>
  )
}
