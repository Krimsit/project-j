import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { ProgressBar, Card } from 'react-native-paper'

import type { FC } from 'react'

export const Statistics: FC = () => {
  const theme = useTheme()
  const progressBarValue = useMemo(() => 10 / 20, [])

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Title title={'Statistics'} titleVariant={'titleLarge'} />
      <Card.Content>
        <ProgressBar animatedValue={progressBarValue} />
      </Card.Content>
    </Card>
  )
}
