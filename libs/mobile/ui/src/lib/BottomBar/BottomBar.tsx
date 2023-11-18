import { BottomNavigation } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'

import type { FC } from 'react'
import type { Route } from '@react-navigation/native'
import type { BottomBarProps } from './BottomBar.types'

export const BottomBar: FC<BottomBarProps> = ({
  descriptors,
  navigation,
  insets,
  state,
}) => {
  const handleTabPress = (route: Route<string>, preventDefault: () => void) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (event.defaultPrevented) {
      preventDefault()
    } else {
      navigation.dispatch({
        ...CommonActions.navigate(route.name, route.params),
        target: state.key,
      })
    }
  }

  const renderOptions = (
    route: Route<string>,
    focused: boolean,
    color: string,
  ) => {
    const { options } = descriptors[route.key]

    if (options.tabBarIcon) {
      return options.tabBarIcon({ focused, color, size: 24 })
    }

    return null
  }

  const renderLabelText = (route: Route<string>) => {
    const { options } = descriptors[route.key]

    return String(options.tabBarLabel)
  }

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) =>
        handleTabPress(route, preventDefault)
      }
      renderIcon={({ route, focused, color }) =>
        renderOptions(route, focused, color)
      }
      getLabelText={({ route }) => renderLabelText(route)}
    />
  )
}
