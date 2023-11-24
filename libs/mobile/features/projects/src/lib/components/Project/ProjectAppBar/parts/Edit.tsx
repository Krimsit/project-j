import { Menu } from 'react-native-paper'
import { Routes } from '@mobile/models'

import type { FC } from 'react'
import type { EditProps } from './common.types'

export const Edit: FC<EditProps> = ({ onClose, navigation }) => {
  const handleOpenEdit = () => {
    onClose()
    navigation.navigate(Routes.Projects, {
      screen: Routes.AddProject,
      params: {
        defaultValues: {
          _id: '1',
          name: 'Project',
          image:
            'https://fastly.picsum.photos/id/661/700/700.jpg?hmac=5JIdMAlFpi9buG1brZ-L0gMljQkKHMiFDwiNZVIduUc',
          selectedUsers: [],
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
