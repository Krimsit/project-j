import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'
import { AppBar as BaseAppBar } from '@mobile/ui'

import type { FC } from 'react'
import type { ProjectFormAppBarProps } from './ProjectFormAppBar.types'

export const ProjectFormAppBar: FC<ProjectFormAppBarProps> = ({ title }) => {
  const navigation = useNavigation()
  const handleClose = () => navigation.goBack()

  return (
    <BaseAppBar
      title={title}
      rightContent={
        <Appbar.Action icon={'close'} onPress={handleClose} size={20} />
      }
    />
  )
}
