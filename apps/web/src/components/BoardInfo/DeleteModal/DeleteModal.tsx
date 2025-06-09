import { Modal, Text, Flex, Button, Group } from '@mantine/core'
import { useDeleteBoard, useBoard } from '@dto/board'

import type { FC } from 'react'

export type DeleteModalModalProps = {
  isOpen: boolean
  onClose: () => void
}

const DeleteModal: FC<DeleteModalModalProps> = ({ isOpen, onClose }) => {
  const { data } = useBoard()
  const { mutate: deleteBoard, isPending } = useDeleteBoard()

  return (
    <Modal opened={isOpen} onClose={onClose} title={'Удалить доску?'}>
      <Flex direction={'column'} gap={'md'}>
        <Text ta={'left'}>
          Вы действительно хотите удалить доску
          <Text component={'span'} fw={700}>
            {data?.name}
          </Text>
        </Text>
        <Group gap={'md'} justify={'flex-end'}>
          <Button onClick={onClose} variant={'subtle'}>
            Отмена
          </Button>
          <Button onClick={deleteBoard} color={'red'} loading={isPending}>
            Удалить
          </Button>
        </Group>
      </Flex>
    </Modal>
  )
}

export default DeleteModal
