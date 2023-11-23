import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from 'react-native-paper'
import { Routes } from '@mobile/models'
import { AppBar } from '@mobile/ui'

import { ProjectsFeature, ProjectFeature, AddProjectFeature } from '../feature'
import { AddProjectAppBar } from '../components'

import type { FC } from 'react'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type {
  ProjectRoutes,
  RouteObjectParams,
  RootRoutesProps,
} from '@mobile/models'

const Stack = createNativeStackNavigator<ProjectRoutes>()

export const ProjectsPage: FC = () => (
  <Stack.Navigator initialRouteName={Routes.AddProject}>
    <Stack.Screen
      name={Routes.AllProjects}
      component={ProjectsFeature}
      options={{ header: () => <AppBar title={'Projects'} /> }}
    />
    <Stack.Screen
      name={Routes.AddProject}
      component={AddProjectFeature}
      options={{
        animation: 'slide_from_right',
        header: () => <AddProjectAppBar />,
      }}
    />
    <Stack.Screen
      name={Routes.Project}
      component={ProjectFeature}
      options={{
        animation: 'none',
        header: ({ options }) => <AppBar title={String(options.title)} />,
      }}
    />
  </Stack.Navigator>
)

export const projectsTabParams: RouteObjectParams<
  keyof RootRoutesProps,
  BottomTabNavigationOptions
> = {
  name: Routes.Projects,
  options: {
    headerShown: false,
    tabBarLabel: 'Projects',
    tabBarIcon({ color, size }) {
      return <Icon source="view-list" size={size} color={color} />
    },
  },
}
