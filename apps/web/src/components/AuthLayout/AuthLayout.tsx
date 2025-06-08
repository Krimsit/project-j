import { Container, Center, Card } from '@mantine/core'

import styles from './AuthLayout.module.scss'

import type { FC, PropsWithChildren } from 'react'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container size={'sm'} className={styles.root}>
      <Center className={styles.root}>
        <Card
          shadow={'sm'}
          padding={'lg'}
          radius={'md'}
          className={styles.card}
          withBorder
        >
          {children}
        </Card>
      </Center>
    </Container>
  )
}

export default AuthLayout
