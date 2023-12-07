import { Routes } from '@mobile/models'

import { TaskFeature } from '../feature'
import { TaskAppBar } from '../components'

import type { FC } from 'react'
import type { RouteObjectParams, MainRoutesProps } from '@mobile/models'
import type { DrawerNavigationOptions } from '@react-navigation/drawer'

export const TaskPage: FC = () => <TaskFeature />

export const taskTabParams: RouteObjectParams<
  keyof MainRoutesProps,
  DrawerNavigationOptions
> = {
  name: Routes.Task,
  options: {
    header: () => <TaskAppBar />,
  },
}
