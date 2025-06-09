import { useSearch, useNavigate, useLocation } from '@tanstack/react-router'
import { Avatar, Drawer, Flex, Text, Title } from '@mantine/core'
import { useTask } from '@dto/task'

import styles from './TaskDrawer.module.scss'

import type { FC } from 'react'

const TaskDrawer: FC = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const location = useLocation()
  const { data } = useTask()

  const handleClose = () =>
    navigate({
      to: location.pathname,
    })

  return (
    <Drawer
      opened={Boolean(search.taskId)}
      onClose={handleClose}
      title={<Title order={3}>{data?.name}</Title>}
      position={'right'}
    >
      <Flex direction={'column'} gap={'md'}>
        <Flex gap={'lg'} align={'flex-start'}>
          <Text fw={700} className={styles.descriptionLabel}>
            Исполнитель:
          </Text>
          <Flex gap={'xs'} align={'center'}>
            <Avatar src={data?.assigner.avatar} />
            <Text>
              {data?.assigner.lastName} {data?.assigner.firstName}{' '}
              {data?.assigner.midName}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={'lg'} align={'flex-start'}>
          <Text fw={700} className={styles.descriptionLabel}>
            Статус:
          </Text>
          <Text>{data?.status}</Text>
        </Flex>
        <Flex gap={'lg'} align={'flex-start'}>
          <Text fw={700} className={styles.descriptionLabel}>
            Завершение:
          </Text>
          <Text>{data?.dueDate.toLocaleString('ru')}</Text>
        </Flex>
        {data?.description && <Text>{data.description}</Text>}
      </Flex>
    </Drawer>
  )
}

export default TaskDrawer
