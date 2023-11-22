import { Fragment } from 'react'

import { AppProjectButton } from './AppProjectButton'
import { ProjectsList } from './ProjectsList'

import type { FC } from 'react'

export const Projects: FC = () => (
  <Fragment>
    <AppProjectButton />
    <ProjectsList />
  </Fragment>
)
