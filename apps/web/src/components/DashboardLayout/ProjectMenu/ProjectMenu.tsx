import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Flex, Button, Menu, Center, Loader } from '@mantine/core'
import { IconArrowsMoveVertical, IconPlus } from '@tabler/icons-react'
import { useMyProjects, useProject } from '@dto/project'

import { CreateModal } from './CreateModal'
import styles from './ProjectMenu.module.scss'

import type { FC } from 'react'

const ProjectMenu: FC = () => {
  const navigate = useNavigate()
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const { data: myProjects, isLoading: isLoadingMyProjects } = useMyProjects()
  const { data: project, isLoading: isLoadingProject } = useProject()

  const handleOpenProject = (id: string) =>
    navigate({
      to: '/dashboard/$projectId',
      params: {
        projectId: id,
      },
    })

  const handleOpenCreateModal = () => setIsOpenCreateModal(true)

  const handleCloseCreateModal = () => setIsOpenCreateModal(false)

  if (isLoadingMyProjects || isLoadingProject) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  return (
    <Flex direction={'column'} gap={'xl'}>
      <Menu width={'target'}>
        <Menu.Target>
          <Button
            variant={'default'}
            size={'compact-md'}
            justify={'space-between'}
            leftSection={
              <div
                style={{ background: project?.gradient ?? 'transparent' }}
                className={styles.projectSelect}
              />
            }
            rightSection={<IconArrowsMoveVertical />}
          >
            {project?.name ?? 'Выберите проект'}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Мои проекты</Menu.Label>
          {myProjects?.map((item) => (
            <Menu.Item
              key={item.id}
              onClick={() => handleOpenProject(item.id)}
              leftSection={
                <div
                  style={{ background: item.gradient ?? 'transparent' }}
                  className={styles.projectSelect}
                />
              }
            >
              {item.name}
            </Menu.Item>
          ))}
          <Menu.Divider />
          <Menu.Label>Действия</Menu.Label>
          <Menu.Item
            onClick={handleOpenCreateModal}
            color={'blue'}
            leftSection={<IconPlus size={14} />}
          >
            Создать проект
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <CreateModal
        isOpen={isOpenCreateModal}
        onClose={handleCloseCreateModal}
      />
    </Flex>
  )
}

export default ProjectMenu
