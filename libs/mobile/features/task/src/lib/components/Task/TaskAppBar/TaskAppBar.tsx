import { useState } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { AppBar as BaseAppBar } from '@mobile/ui'

import { useTaskQuery } from '../../../hook'

import { Edit, Delete } from './parts'

import type { FC } from 'react'

export const TaskAppBar: FC = () => {
  const navigation = useRootNavigation()
  const { data } = useTaskQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  if (!data) {
    return null
  }

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
          <Edit
            onClose={handleClose}
            navigation={navigation}
            data={data.getTask}
          />
          <Delete
            onClose={handleClose}
            navigation={navigation}
            data={data.getTask}
          />
        </Menu>
      }
      withBackButton
    />
  )
}
