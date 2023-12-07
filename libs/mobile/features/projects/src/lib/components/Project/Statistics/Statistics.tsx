import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { ProgressBar, Card, Text } from 'react-native-paper'

import { useProjectQuery } from '../../../hooks'

import type { FC } from 'react'

export const Statistics: FC = () => {
  const theme = useTheme()
  const { data } = useProjectQuery()
  const progressBarValue = useMemo(() => {
    if (data?.getProject) {
      return data.getProject.completedTasksCount / data.getProject.allTasksCount
    }

    return 0
  }, [data?.getProject])

  if (!data) {
    return null
  }

  const { completedTasksCount, allTasksCount } = data.getProject

  return (
    <Card
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <Card.Title title={'Statistics'} titleVariant={'titleLarge'} />
      <Card.Content>
        <Text>{completedTasksCount}</Text>
        <ProgressBar animatedValue={progressBarValue} />
        <Text>{allTasksCount}</Text>
      </Card.Content>
    </Card>
  )
}
