import { useMemo } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { ApiSelect } from '@mobile/feature/api-select'
import { Routes } from '@mobile/models'
import { AuthPage, authTabParams } from '@mobile/feature/auth'
import {
  ProjectFormPage,
  projectFormTabParams,
  ProjectPage,
  projectTabParams,
} from '@mobile/feature/projects'
import {
  TaskFormPage,
  taskFormTabParams,
  TaskPage,
  taskTabParams,
} from '@mobile/feature/task'

import { useGetCurrentGroup } from '../hooks'
import { DrawerContent } from '../components'
import { DrawerStack } from '../constants'

import { Root } from './Root'

import type { FC } from 'react'

export const Drawer: FC = () => {
  const { withApi, isLogin, isLoading } = useGetCurrentGroup()
  const content = useMemo(() => {
    if (!withApi) {
      return (
        <DrawerStack.Group>
          <DrawerStack.Screen name={Routes.ApiSelect} component={ApiSelect} />
        </DrawerStack.Group>
      )
    }

    if (!isLogin) {
      return (
        <DrawerStack.Group>
          <DrawerStack.Screen
            name={authTabParams.name}
            component={AuthPage}
            options={authTabParams.options}
          />
        </DrawerStack.Group>
      )
    }

    return (
      <DrawerStack.Group>
        <DrawerStack.Screen
          name={Routes.Root}
          options={{ headerShown: false }}
          component={Root}
        />
        <DrawerStack.Screen
          name={projectFormTabParams.name}
          component={ProjectFormPage}
          options={projectFormTabParams.options}
        />
        <DrawerStack.Screen
          name={projectTabParams.name}
          component={ProjectPage}
          options={projectTabParams.options}
        />
        <DrawerStack.Screen
          name={taskTabParams.name}
          component={TaskPage}
          options={taskTabParams.options}
        />
        <DrawerStack.Screen
          name={taskFormTabParams.name}
          component={TaskFormPage}
          options={taskFormTabParams.options}
        />
      </DrawerStack.Group>
    )
  }, [withApi, isLogin])

  if (isLoading) {
    return <ActivityIndicator animating />
  }

  return (
    <DrawerStack.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {content}
    </DrawerStack.Navigator>
  )
}
