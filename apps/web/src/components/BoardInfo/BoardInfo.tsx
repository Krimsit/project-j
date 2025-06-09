import { useState, useMemo, Fragment } from 'react'
import { Flex, Text, Avatar, ActionIcon, Menu } from '@mantine/core'
import { IconDotsVertical, IconReload, IconTrash } from '@tabler/icons-react'
import { useBoard } from '@dto/board'
import { PageInfo } from '@components'

import { UpdateModal } from './UpdateModal'
import { DeleteModal } from './DeleteModal'

import type { FC } from 'react'
import type { PageInfoProps } from '@components'

const BoardInfo: FC = () => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const { data } = useBoard()
  const items = useMemo(() => {
    const defaultItems: PageInfoProps['items'] = [
      {
        label: 'Владелец',
        value: (
          <Flex gap={'xs'} align={'center'}>
            <Avatar src={data?.owner.avatar} />
            <Text>
              {data?.owner.lastName} {data?.owner.firstName}{' '}
              {data?.owner.midName}
            </Text>
          </Flex>
        ),
        isCenter: true,
      },
    ]

    if (data?.description) {
      defaultItems.push({
        label: 'Описание',
        value: data.description ?? '',
      })
    }

    return defaultItems
  }, [data])

  const handleOpenUpdateModal = () => setIsOpenUpdateModal(true)

  const handleCloseUpdateModal = () => setIsOpenUpdateModal(false)

  const handleOpenDeleteModal = () => setIsOpenDeleteModal(true)

  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false)

  return (
    <Fragment>
      <PageInfo
        name={data?.name ?? ''}
        items={items}
        actions={
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
        }
      />
      <UpdateModal
        isOpen={isOpenUpdateModal}
        onClose={handleCloseUpdateModal}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
      />
    </Fragment>
  )
}

export default BoardInfo
