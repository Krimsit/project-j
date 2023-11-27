import { useState, Fragment } from 'react'
import { View } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper'

import type { FC } from 'react'

export const DeleteButton: FC = () => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const handleOpenDelete = () => setIsOpenDelete(true)

  const handleCloseDelete = () => {
    setIsOpenDelete(false)
  }

  const handleDelete = () => {
    console.log('Delete task')
    handleCloseDelete()
  }

  return (
    <Fragment>
      <Button icon={'trash-can'} mode={'contained'} onPress={handleOpenDelete}>
        Delete
      </Button>
      <Portal>
        <Dialog visible={isOpenDelete} onDismiss={handleCloseDelete}>
          <Dialog.Content>
            <Text variant={'bodyMedium'}>
              Are you sure you want to delete your account?
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
