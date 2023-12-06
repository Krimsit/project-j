import { Routes } from '@mobile/models'

import { ProjectFeature } from '../feature'
import { ProjectAppBar } from '../components'

import type { FC } from 'react'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RouteObjectParams, MainRoutesProps } from '@mobile/models'
import type { DrawerNavigationOptions } from '@react-navigation/drawer'

export const ProjectPage: FC = () => <ProjectFeature />

export const projectTabParams: RouteObjectParams<
  keyof MainRoutesProps,
  DrawerNavigationOptions
> = {
  name: Routes.Project,
  options: {
    header: () => <ProjectAppBar />,
  },
}
