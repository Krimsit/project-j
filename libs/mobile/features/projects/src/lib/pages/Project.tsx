import { Routes } from '@mobile/models'

import { ProjectFeature } from '../feature'
import { ProjectAppBar } from '../components'

import type { FC } from 'react'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RouteObjectParams, ShellRoutesProps } from '@mobile/models'

export const ProjectPage: FC = () => <ProjectFeature />

export const projectTabParams: RouteObjectParams<
  keyof ShellRoutesProps,
  NativeStackNavigationOptions
> = {
  name: Routes.Project,
  options: {
    animation: 'slide_from_right',
    header: () => <ProjectAppBar />,
  },
}
