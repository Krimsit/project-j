import { Text } from 'react-native-paper'

import { RowContainer } from './common.styles'

import type { FC } from 'react'
import type { RowProps } from './common.types'

export const Row: FC<RowProps> = ({ title, children }) => (
  <RowContainer>
    <Text variant={'bodyMedium'}>{title}</Text>
    {children}
  </RowContainer>
)
