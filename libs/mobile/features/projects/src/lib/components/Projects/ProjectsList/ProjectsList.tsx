import { ProjectCard } from '@mobile/ui'

import { useUserProjectsQuery } from '../../../hook'

import { Container } from './ProjectsList.styles'

import type { FC } from 'react'

export const ProjectsList: FC = () => {
  const { data } = useUserProjectsQuery()

  if (!data) {
    return null
  }

  return (
    <Container>
      {data.getUserProjects.map((project) => (
        <ProjectCard
          key={project._id}
          {...project}
          completedTaskCount={5}
          allTaskCount={10}
        />
      ))}
    </Container>
  )
}
