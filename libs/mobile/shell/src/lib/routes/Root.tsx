import { BottomBar } from '@mobile/ui'
import { HomePage, homeTabParams } from '@mobile/feature/home'
import { Projects, projectsTabParams } from '@mobile/feature/projects'
import { UserPage, userTabParams } from '@mobile/feature/user'

import { RootTabs } from '../constants'

import type { FC } from 'react'

export const Root: FC = () => (
  <RootTabs.Navigator
    screenOptions={{
      unmountOnBlur: true,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomBar
        navigation={navigation}
        descriptors={descriptors}
        insets={insets}
        state={state}
      />
    )}
  >
    <RootTabs.Screen
      name={homeTabParams.name}
      component={HomePage}
      options={homeTabParams.options}
    />
    <RootTabs.Screen
      name={projectsTabParams.name}
      component={Projects}
      options={projectsTabParams.options}
    />
    <RootTabs.Screen
      name={userTabParams.name}
      component={UserPage}
      options={userTabParams.options}
    />
  </RootTabs.Navigator>
)
