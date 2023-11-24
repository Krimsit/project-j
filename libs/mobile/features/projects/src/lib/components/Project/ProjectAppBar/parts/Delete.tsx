import { useState, Fragment } from 'react'
import { Menu, Dialog, Text, Button, Portal } from 'react-native-paper'

import type { FC } from 'react'
import type { MenuItemProps } from './common.types'

export const Delete: FC<MenuItemProps> = ({ onClose }) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const handleOpenDelete = () => setIsOpenDelete(true)

  const handleCloseDelete = () => {
    setIsOpenDelete(false)
    onClose()
  }

  const handleDelete = () => {
    console.log('Delete project')
    handleCloseDelete()
    onClose()
  }

  return (
    <Fragment>
      <Menu.Item
        leadingIcon={'trash-can'}
        title={'Delete'}
        onPress={handleOpenDelete}
      />
      <Portal>
        <Dialog visible={isOpenDelete}>
          <Dialog.Content>
            <Text variant={'bodyMedium'}>
              Are you sure you want to delete the project?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode={'outlined'} onPress={handleCloseDelete}>
              No
            </Button>
            <Button mode={'contained'} onPress={handleDelete}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fragment>
  )
}
