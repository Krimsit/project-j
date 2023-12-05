import { useTheme } from 'styled-components'
import {
  Text,
  Icon as BaseIcon,
  Card as BaseCard,
  ActivityIndicator,
} from 'react-native-paper'

import { Container, IconContainer, Icon } from './Card.styles'

import type { FC } from 'react'
import type { CardProps } from './Card.types'

export const Card: FC<CardProps> = ({
  color,
  icon,
  onPress,
  count,
  title,
  loading,
}) => {
  const theme = useTheme()
  const countText = count < 10 ? `0${count}` : count

  return (
    <Container
      onPress={onPress}
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <BaseCard.Title
        left={() => (
          <IconContainer elevation={0} mode={'flat'} $color={color}>
            <Icon elevation={0} mode={'flat'} $color={color}>
              <BaseIcon
                size={16}
                source={icon}
                color={theme.colors.onPrimary}
              />
            </Icon>
          </IconContainer>
        )}
        title={title}
        titleVariant={'titleSmall'}
        titleNumberOfLines={5}
      />
      <BaseCard.Actions>
        {!loading ? (
          <Text variant={'titleLarge'}>{countText}</Text>
        ) : (
          <ActivityIndicator animating />
        )}
      </BaseCard.Actions>
    </Container>
  )
}
