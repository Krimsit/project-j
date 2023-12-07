import styled from 'styled-components'
import { Surface, Card } from 'react-native-paper'

import { alpha } from '../../../helpers'

import type { StyledIcon } from './Card.types'

export const Container = styled(Card)`
  flex: 1;
`

export const IconContainer = styled(Surface)<StyledIcon>`
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${({ $color }) => alpha($color, 0.5)};
  margin-bottom: 10px;
`

export const Icon = styled(Surface)<StyledIcon>`
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${({ $color }) => $color};
`
