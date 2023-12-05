import { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { TaskStatus } from '@shared/models'

import { useProjectTasksQuery } from '../../../hook'

import { Column } from './parts'
import { Container } from './Board.styles'

import type { FC } from 'react'
import type { Task } from '@shared/models'

export const Board: FC = () => {
  const theme = useTheme()
  const [toDo, setToDo] = useState<Task[]>([])
  const [onHold, setOnHold] = useState<Task[]>([])
  const [inProgress, setInProgress] = useState<Task[]>([])
  const [underReview, setUnderReview] = useState<Task[]>([])
  const [done, setDone] = useState<Task[]>([])
  const { data, loading } = useProjectTasksQuery()

  useEffect(() => {
    if (data) {
      const { getProjectTasks } = data
      const toDoArray: Task[] = []
      const onHoldArray: Task[] = []
      const inProgressArray: Task[] = []
      const underReviewArray: Task[] = []
      const doneArray: Task[] = []

      getProjectTasks.forEach((task) => {
        switch (task.status) {
          case TaskStatus.ToDo:
            toDoArray.push(task)
            break
          case TaskStatus.OnHold:
            onHoldArray.push(task)
            break
          case TaskStatus.InProgress:
            inProgressArray.push(task)
            break
          case TaskStatus.UnderReview:
            underReviewArray.push(task)
            break
          case TaskStatus.Done:
            doneArray.push(task)
            break
          default:
            return
        }
      })

      setToDo(toDoArray)
      setOnHold(onHoldArray)
      setInProgress(inProgressArray)
      setUnderReview(underReviewArray)
      setDone(doneArray)
    }
  }, [data])

  if (loading) {
    return <ActivityIndicator animating />
  }

  return (
    <ScrollView horizontal>
      <Container>
        <Column
          title={'To Do'}
          cards={toDo}
          color={theme.colors.taskStatuses.todo}
        />
        <Column
          title={'In Progress'}
          cards={inProgress}
          color={theme.colors.taskStatuses.inProgress}
        />
        <Column
          title={'Under Review'}
          cards={underReview}
          color={theme.colors.taskStatuses.completed}
        />
        <Column
          title={'Done'}
          cards={done}
          color={theme.colors.taskStatuses.completed}
        />
        <Column
          title={'On Hold'}
          cards={onHold}
          color={theme.colors.taskStatuses.todo}
        />
      </Container>
    </ScrollView>
  )
}
