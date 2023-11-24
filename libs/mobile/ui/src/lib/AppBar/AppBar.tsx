import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { Appbar as Header } from 'react-native-paper'

import type { FC } from 'react'
import type { AppBarProps } from './AppBar.types'

export const AppBar: FC<AppBarProps> = ({
  withBackButton,
  title,
  rightContent,
  onBack,
}) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const handleBack = () => (onBack ? onBack() : navigation.goBack())

  return (
    <Header theme={{ colors: { surface: theme.colors.background } }}>
      {withBackButton && <Header.BackAction onPress={handleBack} />}
      <Header.Content title={title} />
      {rightContent}
    </Header>
  )
}
