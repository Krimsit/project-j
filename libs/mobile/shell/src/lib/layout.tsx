import { useEffect, Fragment } from 'react'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  AuthActions,
  useAuthDispatch,
  useAuthState,
} from '@mobile/auth-provider'
import { AuthPage } from '@mobile/feature/auth'
import { HomePage, homeTabParams } from '@mobile/feature/home'
import { UserPage, userTabParams } from '@mobile/feature/user'
import { ProjectsPage, projectsTabParams } from '@mobile/feature/projects'
import {
  TaskFormPage,
  taskFormTabParams,
  TaskPage,
  taskTabParams,
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

void SplashScreen.preventAutoHideAsync()

export const Layout: FC = () => {
  const dispatch = useAuthDispatch()
  const state = useAuthState()

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = ''

      try {
        userToken = (await getItemAsync('userToken')) as string
      } catch (e) {
        console.log('Restore user token')
      }

      dispatch({ type: AuthActions.RestoreToken, token: userToken })
      userToken && (await setItemAsync('userToken', userToken))

      await SplashScreen.hideAsync()
    }

    void bootstrapAsync()
  }, [dispatch])

  if (state.isLoading) {
    return
  }

  return (
    <Stack.Navigator>
      {state.userToken ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Stack.Screen
          name={Routes.Auth}
          component={AuthPage}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  )
}
