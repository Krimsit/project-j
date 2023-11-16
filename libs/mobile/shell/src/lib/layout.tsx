import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from '@mobile/feature/home'
import { UserPage } from '@mobile/feature/user'
import { ProjectsPage } from '@mobile/feature/projects'
import { TaskPage } from '@mobile/feature/task'
import { Routes } from '@mobile/models'

import type { FC } from 'react'
import type { RootRoutesProps, ShellRoutesProps } from '@mobile/models'

const Tab = createBottomTabNavigator<RootRoutesProps>()
const Stack = createNativeStackNavigator<ShellRoutesProps>()
const RootPage: FC = () => (
  <Tab.Navigator>
    <Tab.Screen name={Routes.Home} component={HomePage} />
    <Tab.Screen
      name={Routes.Projects}
      component={ProjectsPage}
      options={{ headerShown: false }}
    />
    <Tab.Screen name={Routes.User} component={UserPage} />
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
      name={Routes.Task}
      component={TaskPage}
      options={{
        animation: 'slide_from_right',
      }}
    />
  </Stack.Navigator>
)
