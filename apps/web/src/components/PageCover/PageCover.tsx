import { Container } from '@mantine/core'
import { useProject } from '@dto/project'

import styles from './PageCover.module.scss'

import type { FC, ComponentType } from 'react'

export type PageCoverProps = {
  icon: ComponentType<{ size: number; className: string }>
}

const PageCover: FC<PageCoverProps> = ({ icon: Icon }) => {
  const { data } = useProject()

  return (
    <div
      style={{ background: data?.gradient ?? 'transparent' }}
      className={styles.root}
    >
      <Container size={'xl'} p={'xl'}>
        <Icon size={128} className={styles.icon} />
      </Container>
    </div>
  )
}

export default PageCover
