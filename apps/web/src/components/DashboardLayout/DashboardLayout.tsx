import { Flex, ScrollArea, Paper, Container } from '@mantine/core'

import { UserMenu } from './UserMenu'
import { ProjectMenu } from './ProjectMenu'
import styles from './DashboardLayout.module.scss'

import type { FC, PropsWithChildren } from 'react'

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex className={styles.root}>
      <ScrollArea type={'hover'} className={styles.menu}>
        <Paper p={'xl'} className={styles.menuContent}>
          <Flex direction={'column'} gap={'xl'}>
            <UserMenu />
            <ProjectMenu />
          </Flex>
        </Paper>
      </ScrollArea>
      <ScrollArea className={styles.container}>
        <Container size={'xl'} p={'xl'} className={styles.containerContent}>
          {children}
        </Container>
      </ScrollArea>
    </Flex>
  )
}

export default DashboardLayout
