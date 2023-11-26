import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage, homeTabParams } from '@mobile/feature/home'
import { UserPage, userTabParams } from '@mobile/feature/user'
import { ProjectsPage, projectsTabParams } from '@mobile/feature/projects'
import {
  TaskPage,
  taskTabParams,
  TaskFormPage,
  taskFormTabParams,
} from '@mobile/feature/task'
import { Routes } from '@mobile/models'
import { BottomBar } from '@mobile/ui'

import type { FC } from 'react'
import type { RootRoutesProps, ShellRoutesProps } from '@mobile/models'

const Tab = createBottomTabNavigator<RootRoutesProps>()
const Stack = createNativeStackNavigator<ShellRoutesProps>()
const RootPage: FC = () => (
  <Tab.Navigator
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomBar
        navigation={navigation}
        descriptors={descriptors}
        insets={insets}
        state={state}
      />
    )}
  >
    <Tab.Screen
      name={homeTabParams.name}
      component={HomePage}
      options={homeTabParams.options}
    />
    <Tab.Screen
      name={projectsTabParams.name}
      component={ProjectsPage}
      options={projectsTabParams.options}
    />
    <Tab.Screen
      name={userTabParams.name}
      component={UserPage}
      options={userTabParams.options}
    />
  </Tab.Navigator>
)

export const Layout: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Root}
      options={{ headerShown: false }}
      component={RootPage}
    />
    <Stack.Screen
      name={taskTabParams.name}
      component={TaskPage}
      options={taskTabParams.options}
    />
    <Stack.Screen
      name={taskFormTabParams.name}
      component={TaskFormPage}
      options={taskFormTabParams.options}
    />
  </Stack.Navigator>
)
