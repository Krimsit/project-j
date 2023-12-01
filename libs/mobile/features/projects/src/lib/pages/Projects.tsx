import { Icon } from 'react-native-paper'
import { AppBar } from '@mobile/ui'
import { Routes } from '@mobile/models'

import { ProjectsFeature } from '../feature'

import type { FC } from 'react'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { RouteObjectParams, RootRoutesProps } from '@mobile/models'

export const Projects: FC = () => <ProjectsFeature />

export const projectsTabParams: RouteObjectParams<
  keyof RootRoutesProps,
  BottomTabNavigationOptions
> = {
  name: Routes.Projects,
  options: {
    header: () => <AppBar title={'Projects'} />,
    tabBarLabel: 'Projects',
    tabBarIcon({ color, size }) {
      return <Icon source="view-list" size={size} color={color} />
    },
  },
}
