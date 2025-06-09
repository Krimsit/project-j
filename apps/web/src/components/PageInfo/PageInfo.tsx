import { Flex, Title, Text } from '@mantine/core'

import styles from './PageInfo.module.scss'

import type { FC, ReactNode } from 'react'

export type PageInfoProps = {
  name: string
  actions?: ReactNode
  items?: Array<{ label: string; value: ReactNode; isCenter?: boolean }>
}

const PageInfo: FC<PageInfoProps> = ({ name, actions, items }) => {
  return (
    <Flex direction={'column'} gap={'md'} className={styles.root}>
      <Flex gap={'md'} align={'center'}>
        <Title order={1} ta={'left'}>
          {name}
        </Title>
        {actions}
      </Flex>
      <Flex direction={'column'} gap={'sm'}>
        {items?.map((item) => (
          <Flex
            key={item.label}
            gap={'lg'}
            align={item.isCenter ? 'center' : 'flex-start'}
          >
            <Text fw={700} className={styles.descriptionLabel}>
              {item.label}:
            </Text>
            {item.value}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default PageInfo
