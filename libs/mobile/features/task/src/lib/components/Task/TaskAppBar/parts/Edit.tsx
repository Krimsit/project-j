import { Menu } from 'react-native-paper'
import { Routes } from '@mobile/models'
import { TaskPriority } from '@shared/models'

import type { FC } from 'react'
import type { EditProps } from './common.types'

export const Edit: FC<EditProps> = ({ onClose, navigation }) => {
  const handleOpenEdit = () => {
    onClose()
    navigation.navigate(Routes.TaskForm, {
      project_id: '1',
      defaultValues: {
        _id: '1',
        task_name: 'Task',
        due_date: String(new Date()),
        priority: TaskPriority.High,
        assigner: '3',
        description: 'Description',
      },
    })
  }

  return (
    <Menu.Item
      leadingIcon={'playlist-edit'}
      title={'Edit'}
      onPress={handleOpenEdit}
    />
  )
}
