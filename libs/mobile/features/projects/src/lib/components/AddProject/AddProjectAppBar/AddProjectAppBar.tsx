import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'
import { AppBar as BaseAppBar } from '@mobile/ui'

import type { FC } from 'react'

export const AddProjectAppBar: FC = () => {
  const navigation = useNavigation()
  const handleClose = () => navigation.goBack()

  return (
    <BaseAppBar
      title={'New Project'}
      rightContent={
        <Appbar.Action icon={'close'} onPress={handleClose} size={20} />
      }
    />
  )
}
