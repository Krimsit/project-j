import { Container } from '@mantine/core'
import { IconHomeFilled } from '@tabler/icons-react'
import { useProject } from '@dto/project'

import styles from './ProjectCover.module.scss'

import type { FC } from 'react'

const ProjectCover: FC = () => {
  const { data } = useProject()

  return (
    <div
      style={{ background: data?.gradient ?? 'transparent' }}
      className={styles.root}
    >
      <Container size={'xl'} p={'xl'}>
        <IconHomeFilled size={128} className={styles.icon} />
      </Container>
    </div>
  )
}

export default ProjectCover
