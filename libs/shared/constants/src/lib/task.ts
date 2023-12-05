import { TaskPriority, TaskStatus } from '@shared/models'

import type { TaskPriorityItem, TaskStatusItem } from '@shared/models'

export const tasksPriority: TaskPriorityItem[] = [
  {
    value: TaskPriority.Low,
    label: 'Low',
  },
  {
    value: TaskPriority.Medium,
    label: 'Medium',
  },
  {
    value: TaskPriority.High,
    label: 'High',
  },
]

export const tasksStatusLabel: Record<TaskStatus, string> = {
  [TaskStatus.OnHold]: 'On Hold',
  [TaskStatus.ToDo]: 'ToDo',
  [TaskStatus.InProgress]: 'In Progress',
  [TaskStatus.UnderReview]: 'Under Review',
  [TaskStatus.Done]: 'Done',
}

export const defaultTaskStatuses: TaskStatusItem[] = [
  {
    value: TaskStatus.OnHold,
    label: tasksStatusLabel[TaskStatus.OnHold],
  },
]

export const taskStatusesAfterToDo: TaskStatusItem[] = [
  {
    value: TaskStatus.InProgress,
    label: tasksStatusLabel[TaskStatus.InProgress],
  },
  ...defaultTaskStatuses,
]

export const taskStatusesAfterInProgress: TaskStatusItem[] = [
  {
    value: TaskStatus.UnderReview,
    label: tasksStatusLabel[TaskStatus.UnderReview],
  },
  {
    value: TaskStatus.Done,
    label: tasksStatusLabel[TaskStatus.Done],
  },
  ...defaultTaskStatuses,
]

export const taskStatusesAfterUnderReview: TaskStatusItem[] = [
  {
    value: TaskStatus.Done,
    label: tasksStatusLabel[TaskStatus.Done],
  },
  ...defaultTaskStatuses,
]

export const taskStatusesAfterOnHold = [
  {
    value: TaskStatus.ToDo,
    label: tasksStatusLabel[TaskStatus.ToDo],
  },
  {
    value: TaskStatus.InProgress,
    label: tasksStatusLabel[TaskStatus.InProgress],
  },
  {
    value: TaskStatus.UnderReview,
    label: tasksStatusLabel[TaskStatus.UnderReview],
  },
  {
    value: TaskStatus.Done,
    label: tasksStatusLabel[TaskStatus.Done],
  },
]

export const allTaskStatuses = [
  {
    value: TaskStatus.OnHold,
    label: tasksStatusLabel[TaskStatus.OnHold],
  },
  {
    value: TaskStatus.ToDo,
    label: tasksStatusLabel[TaskStatus.ToDo],
  },
  {
    value: TaskStatus.InProgress,
    label: tasksStatusLabel[TaskStatus.InProgress],
  },
  {
    value: TaskStatus.UnderReview,
    label: tasksStatusLabel[TaskStatus.UnderReview],
  },
  {
    value: TaskStatus.Done,
    label: tasksStatusLabel[TaskStatus.Done],
  },
]
