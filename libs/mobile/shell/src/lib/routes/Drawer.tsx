import { useState, useEffect } from 'react'
import { ApiSelect } from '@mobile/feature/api-select'
import { Routes } from '@mobile/models'
import { useApiState } from '@mobile/api-provider'
import {
  AuthActions,
  useAuthDispatch,
  useAuthState,
} from '@mobile/auth-provider'
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
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { ActivityIndicator } from 'react-native-paper'

import { DrawerContent } from '../components'
import { DrawerStack } from '../constants'

import { Root } from './Root'

import type { FC } from 'react'

export const Drawer: FC = () => {
  const { apiUri, isLoading: isLoadingApi } = useApiState()
  const { userToken, isLoading: isLoadingUser } = useAuthState()
  const dispatchAuth = useAuthDispatch()
  const [withApi, setWithApi] = useState<boolean>(false)
  const isLogin = Boolean(userToken)
  const isLoading = isLoadingApi || isLoadingUser

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = ''

      try {
        userToken = (await getItemAsync('userToken')) as string
      } catch (e) {
        dispatchAuth({ type: AuthActions.SignOut })
      }

      dispatchAuth({ type: AuthActions.RestoreToken, token: userToken })
      userToken && (await setItemAsync('userToken', userToken))
    }

    void bootstrapAsync()
  }, [dispatchAuth])

  useEffect(() => {
    setWithApi(Boolean(apiUri))
  }, [apiUri])

  if (isLoading) {
    return <ActivityIndicator animating />
  }

  const renderContent = () => {
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
  }

  return (
    <DrawerStack.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={() => <DrawerContent />}
    >
      {renderContent()}
    </DrawerStack.Navigator>
  )
}
