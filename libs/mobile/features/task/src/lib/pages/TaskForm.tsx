import { Routes } from '@mobile/models'

import { TaskFormFeature } from '../feature'
import { TaskFormAppBar } from '../components'

import type { FC } from 'react'
import type { RouteObjectParams, MainRoutesProps } from '@mobile/models'
import type { DrawerNavigationOptions } from '@react-navigation/drawer'

export const TaskFormPage: FC = () => <TaskFormFeature />

export const taskFormTabParams: RouteObjectParams<
  keyof MainRoutesProps,
  DrawerNavigationOptions
> = {
  name: Routes.TaskForm,
  options: {
    header: ({ options }) => <TaskFormAppBar title={String(options.title)} />,
  },
}
