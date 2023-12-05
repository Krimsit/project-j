import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Chip } from 'react-native-paper'
import { Select, useTaskStatusColor, useTaskStatusIcon } from '@mobile/ui'
import { TaskStatus } from '@shared/models'
import { allTaskStatuses } from '@shared/constants'

import {
  useTaskNextStatusesQuery,
  useTaskQuery,
  useUpdateTaskStatusMutation,
} from '../../../../hook'

import { Row } from './Row'

import type { FC } from 'react'
import type { TaskStatusItem } from '@shared/models'

export const Status: FC = () => {
  const { data } = useTaskQuery()
  const [getNextStatuses, { data: statuses }] = useTaskNextStatusesQuery()
  const [updateStatus, { loading: updateStatusLoading }] =
    useUpdateTaskStatusMutation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedStatus, setCheckedStatus] = useState<
    TaskStatusItem | undefined
  >(undefined)
  const handleClose = () => setIsOpen(false)
  const color = useTaskStatusColor(checkedStatus?.value ?? TaskStatus.ToDo)
  const icon = useTaskStatusIcon(checkedStatus?.value ?? TaskStatus.ToDo, 16)

  const handleOpen = () => {
    setIsOpen(true)
    void getNextStatuses()
  }

  const handleApply = (status?: TaskStatusItem) => {
    setCheckedStatus(status)

    if (status) {
      void updateStatus({
        variables: {
          taskId: data?.getTask._id ?? '',
          value: {
            status: status?.value ?? TaskStatus.ToDo,
          },
        },
      })
    }
  }

  useEffect(() => {
    const status = allTaskStatuses.find(
      (item) => item.value === data?.getTask.status,
    )

    if (status) {
      setCheckedStatus(status)
    }
  }, [data?.getTask.status])

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
          values={statuses?.getTaskNextStatuses || []}
          valueField={'value'}
          labelField={'label'}
          value={checkedStatus}
          loading={updateStatusLoading}
        />
      </View>
    </Row>
  )
}
