import { Routes } from '@mobile/models'

import { TaskFeature, Header } from '../feature'

import type { FC } from 'react'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RouteObjectParams, ShellRoutesProps } from '@mobile/models'

export const TaskPage: FC = () => <TaskFeature />

export const taskTabParams: RouteObjectParams<
  keyof ShellRoutesProps,
  NativeStackNavigationOptions
> = {
  name: Routes.Task,
  options: {
    animation: 'slide_from_right',
    header: ({ options }) => <Header title={String(options.title)} />,
  },
}
