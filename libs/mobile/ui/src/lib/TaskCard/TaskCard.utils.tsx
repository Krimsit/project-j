import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Icon } from 'react-native-paper'
import { TaskPriority, TaskStatus } from '@shared/models'

export const useTaskStatusColor = (status: TaskStatus) => {
  const theme = useTheme()

  return useMemo(() => {
    switch (status) {
      case TaskStatus.ToDo:
      case TaskStatus.OnHold:
        return theme.colors.taskStatuses.todo
      case TaskStatus.InProgress:
        return theme.colors.taskStatuses.inProgress
      case TaskStatus.Done:
        return theme.colors.taskStatuses.completed
      default:
        return null
    }
  }, [status, theme])
}

export const useTaskStatusIcon = (status: TaskStatus, size = 30) => {
  const color = useTaskStatusColor(status)

  return useMemo(() => {
    switch (status) {
      case TaskStatus.ToDo:
      case TaskStatus.OnHold:
        return (
          <Icon
            size={size}
            source={'checkbox-blank-circle-outline'}
            color={color}
          />
        )
      case TaskStatus.InProgress:
        return <Icon size={size} source={'circle-edit-outline'} color={color} />
      case TaskStatus.Done:
        return (
          <Icon size={size} source={'checkbox-marked-circle'} color={color} />
        )
      default:
        return null
    }
  }, [color, size, status])
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
