import { useNavigation } from '@react-navigation/native'
import { Appbar as Header } from 'react-native-paper'

import type { FC } from 'react'
import type { AppBarProps } from './AppBar.types'

export const AppBar: FC<AppBarProps> = ({
  withBackButton,
  title,
  rightContent,
}) => {
  const navigation = useNavigation()

  return (
    <Header>
      {withBackButton && <Header.BackAction onPress={navigation.goBack} />}
      <Header.Content title={title} />
      {rightContent}
    </Header>
  )
}
