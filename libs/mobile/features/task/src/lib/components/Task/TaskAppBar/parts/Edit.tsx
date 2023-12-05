import { Menu } from 'react-native-paper'
import { Routes } from '@mobile/models'

import type { FC } from 'react'
import type { MenuItemProps } from './common.types'

export const Edit: FC<MenuItemProps> = ({ onClose, navigation, data }) => {
  const handleOpenEdit = () => {
    onClose()
    navigation.navigate(Routes.TaskForm, {
      project_id: data.project._id,
      defaultValues: {
        _id: data._id,
        name: data.name,
        dueDate: String(new Date(data.dueData)),
        priority: data.priority,
        assigner: data.assigner._id,
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
