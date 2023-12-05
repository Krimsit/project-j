import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { ProgressBar, Card } from 'react-native-paper'

import { useProjectQuery } from '../../../hook'

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
