import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Icon } from 'react-native-paper'
import { TaskPriority, TaskStatus } from '@shared/models'

export const useTaskStatusIcon = (status: TaskStatus) => {
  const theme = useTheme()

  return useMemo(() => {
    switch (status) {
      case TaskStatus.ToDo:
      case TaskStatus.OnHold:
        return (
          <Icon
            size={30}
            source={'checkbox-blank-circle-outline'}
            color={theme.colors.taskStatuses.todo}
          />
        )
      case TaskStatus.InProgress:
        return (
          <Icon
            size={30}
            source={'circle-edit-outline'}
            color={theme.colors.taskStatuses.inProgress}
          />
        )
      case TaskStatus.Done:
        return (
          <Icon
            size={30}
            source={'checkbox-marked-circle'}
            color={theme.colors.taskStatuses.completed}
          />
        )
      default:
        return null
    }
  }, [status, theme])
}

export const useTaskPriorityIconColor = (priority?: TaskPriority) => {
  const theme = useTheme()

  return useMemo(() => {
    switch (priority) {
      case TaskPriority.Low:
        return theme.colors.taskPriority.low
      case TaskPriority.Medium:
        return theme.colors.taskPriority.medium
      case TaskPriority.High:
        return theme.colors.taskPriority.high
      default:
        return ''
    }
  }, [priority, theme])
}
