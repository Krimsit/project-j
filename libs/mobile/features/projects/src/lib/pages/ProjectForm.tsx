import { Routes } from '@mobile/models'

import { ProjectFormFeature } from '../feature'
import { ProjectFormAppBar } from '../components'

import type { FC } from 'react'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RouteObjectParams, ShellRoutesProps } from '@mobile/models'

export const ProjectFormPage: FC = () => <ProjectFormFeature />

export const projectFormTabParams: RouteObjectParams<
  keyof ShellRoutesProps,
  NativeStackNavigationOptions
> = {
  name: Routes.ProjectForm,
  options: {
    animation: 'slide_from_right',
    header: ({ options }) => (
      <ProjectFormAppBar title={String(options.title)} />
    ),
  },
}
