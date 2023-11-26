import styled from 'styled-components'
import { View, Image } from 'react-native'
import { Button as BaseButton } from 'react-native-paper'

export const RowContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Button = styled(BaseButton)`
  border-radius: ${({ theme }) => `${theme.roundness}px`};
`

export const UploadTitle = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UploadImages = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`

export const UploadImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => `${theme.roundness}px`};
`
