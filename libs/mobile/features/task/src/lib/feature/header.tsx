import { Appbar } from 'react-native-paper'
import { AppBar } from '@mobile/ui'

import type { FC } from 'react'
import type { StackProps } from '../types'

export const Header: FC<StackProps> = ({ title }) => {
  const onOpenMenu = () => console.log('open task menu')

  return (
    <AppBar
      title={title}
      rightContent={
        <Appbar.Action icon={'dots-vertical'} onPress={onOpenMenu} />
      }
      withBackButton
    />
  )
}
