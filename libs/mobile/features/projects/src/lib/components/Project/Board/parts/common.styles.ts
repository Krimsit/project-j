import styled from 'styled-components'
import { View } from 'react-native'

import type { StyledColumnContainerProps } from './common.types'

export const ColumnContainer = styled(View)<StyledColumnContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: ${({ $width }) => `${$width - 80}px`};
`

export const ColumnTitle = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

export const ColumnTaskList = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  padding: 20px 10px;
`

export const ColumnNoData = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`
