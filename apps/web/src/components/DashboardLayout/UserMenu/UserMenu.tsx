import { Menu, Button, Flex, Text, Avatar } from '@mantine/core'
import {
  IconArrowsMoveVertical,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'
import { useProfile } from '@dto/user'

import styles from './UserMenu.module.scss'

import type { FC } from 'react'

const UserMenu: FC = () => {
  const { data } = useProfile()

  return (
    <Menu shadow={'md'} width={'target'}>
      <Menu.Target>
        <Button
          leftSection={<Avatar src={data?.avatar} size={'md'} />}
          rightSection={<IconArrowsMoveVertical />}
          variant={'default'}
          size={'xl'}
          justify={'space-between'}
          className={styles.root}
          fullWidth
        >
          <Flex direction={'column'}>
            <Text>
              {data?.lastName} {data?.firstName} {data?.midName}
            </Text>
            <Text size={'sm'} c={'dimmed'} ta={'left'}>
              @{data?.username}
            </Text>
          </Flex>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          Настройки аккаунта
        </Menu.Item>
        <Menu.Item color={'red'} leftSection={<IconLogout size={14} />}>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMenu
