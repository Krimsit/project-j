import { useState } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { AppBar as BaseAppBar } from '@mobile/ui'

import { Edit, Delete } from './parts'

import type { FC } from 'react'

export const TaskAppBar: FC = () => {
  const navigation = useRootNavigation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <BaseAppBar
      title={''}
      rightContent={
        <Menu
          visible={isOpen}
          onDismiss={handleClose}
          anchor={
            <Appbar.Action
              icon={'dots-vertical'}
              onPress={handleOpen}
              size={20}
            />
          }
        >
          <Edit onClose={handleClose} navigation={navigation} />
          <Delete onClose={handleClose} />
        </Menu>
      }
      withBackButton
    />
  )
}
