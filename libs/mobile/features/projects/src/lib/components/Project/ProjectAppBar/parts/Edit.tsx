import { Menu } from 'react-native-paper'
import { Routes } from '@mobile/models'

import type { FC } from 'react'
import type { EditItemProps } from './common.types'

export const Edit: FC<EditItemProps> = ({ onClose, navigation, data }) => {
  const { _id, name, image, users } = data

  const handleOpenEdit = () => {
    onClose()
    navigation.navigate(Routes.ProjectForm, {
      defaultValues: {
        _id,
        name,
        users,
        image: {
          base64: image,
          filename: '',
        },
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
