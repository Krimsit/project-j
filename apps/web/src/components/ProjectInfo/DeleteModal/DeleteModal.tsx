import { Modal, Text, Flex, Button, Group } from '@mantine/core'
import { useDeleteProjects, useProject } from '@dto/project'

import type { FC } from 'react'

export type DeleteModalModalProps = {
  isOpen: boolean
  onClose: () => void
}

const DeleteModal: FC<DeleteModalModalProps> = ({ isOpen, onClose }) => {
  const { data } = useProject()
  const { mutate: deleteProject, isPending } = useDeleteProjects()

  return (
    <Modal opened={isOpen} onClose={onClose} title={'Удалить проект?'}>
      <Flex direction={'column'} gap={'md'}>
        <Text ta={'left'}>
          Вы действительно хотите удалить проект{' '}
          <Text component={'span'} fw={700}>
            {data?.name}
          </Text>
        </Text>
        <Group gap={'md'} justify={'flex-end'}>
          <Button onClick={onClose} variant={'subtle'}>
            Отмена
          </Button>
          <Button onClick={deleteProject} color={'red'} loading={isPending}>
            Удалить
          </Button>
        </Group>
      </Flex>
    </Modal>
  )
}

export default DeleteModal
