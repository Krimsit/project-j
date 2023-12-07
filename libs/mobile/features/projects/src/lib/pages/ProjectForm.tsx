import { Routes } from '@mobile/models'

import { ProjectFormFeature } from '../feature'
import { ProjectFormAppBar } from '../components'

import type { FC } from 'react'
import type { RouteObjectParams, MainRoutesProps } from '@mobile/models'
import type { DrawerNavigationOptions } from '@react-navigation/drawer'

export const ProjectFormPage: FC = () => <ProjectFormFeature />

export const projectFormTabParams: RouteObjectParams<
  keyof MainRoutesProps,
  DrawerNavigationOptions
> = {
  name: Routes.ProjectForm,
  options: {
    header: ({ options }) => (
      <ProjectFormAppBar title={String(options.title)} />
    ),
  },
}
