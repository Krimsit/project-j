import { Routes } from '@mobile/models'

import { TaskFormFeature } from '../feature'
import { TaskFormAppBar } from '../components'

import type { FC } from 'react'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RouteObjectParams, ShellRoutesProps } from '@mobile/models'

export const TaskFormPage: FC = () => <TaskFormFeature />

export const taskFormTabParams: RouteObjectParams<
  keyof ShellRoutesProps,
  NativeStackNavigationOptions
> = {
  name: Routes.TaskForm,
  options: {
    animation: 'slide_from_right',
    header: ({ options }) => <TaskFormAppBar title={String(options.title)} />,
  },
}
