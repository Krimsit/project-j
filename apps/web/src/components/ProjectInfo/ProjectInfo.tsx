import { useState } from 'react'
import { Flex, Title, Text, Avatar, ActionIcon, Menu } from '@mantine/core'
import { IconDotsVertical, IconReload, IconTrash } from '@tabler/icons-react'
import { useProject } from '@dto/project'

import { UpdateModal } from './UpdateModal'
import { DeleteModal } from './DeleteModal'
import styles from './ProjectInfo.module.scss'

import type { FC } from 'react'

const ProjectInfo: FC = () => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const { data } = useProject()

  const handleOpenUpdateModal = () => setIsOpenUpdateModal(true)

  const handleCloseUpdateModal = () => setIsOpenUpdateModal(false)

  const handleOpenDeleteModal = () => setIsOpenDeleteModal(true)

  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false)

  return (
    <Flex direction={'column'} gap={'md'} className={styles.root}>
      <Flex gap={'md'} align={'center'}>
        <Title order={1} ta={'left'}>
          {data?.name}
        </Title>
        <Menu position={'bottom-end'}>
          <Menu.Target>
            <ActionIcon variant={'transparent'}>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={handleOpenUpdateModal}
              leftSection={<IconReload size={14} />}
            >
              Изменить информацию
            </Menu.Item>
            <Menu.Item
              onClick={handleOpenDeleteModal}
              color={'red'}
              leftSection={<IconTrash size={14} />}
            >
              Удалить
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Flex direction={'column'} gap={'sm'}>
        <Flex gap={'lg'} align={'center'}>
          <Text fw={700}>Владелец:</Text>
          <Flex gap={'xs'} align={'center'}>
            <Avatar src={data?.owner.avatar} />
            <Text>
              {data?.owner.lastName} {data?.owner.firstName}{' '}
              {data?.owner.midName}
            </Text>
          </Flex>
        </Flex>
        {data?.description && (
          <Flex gap={'lg'}>
            <Text fw={700}>Описание:</Text>
            <Text>{data.description}</Text>
          </Flex>
        )}
      </Flex>
      <UpdateModal
        isOpen={isOpenUpdateModal}
        onClose={handleCloseUpdateModal}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
      />
    </Flex>
  )
}

export default ProjectInfo
