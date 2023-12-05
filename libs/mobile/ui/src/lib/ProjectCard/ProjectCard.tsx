import { useTheme } from 'styled-components'
import { useMemo } from 'react'
import {
  Card as BaseCard,
  Text,
  Avatar,
  Icon,
  ProgressBar,
} from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { InfoChip, Info, Title, Content } from './ProjectCard.styles'

import type { FC } from 'react'
import type { ProjectCardProps } from './ProjectCard.types'

export const ProjectCard: FC<ProjectCardProps> = ({
  _id,
  allTasksCount,
  completedTasksCount,
  image,
  name,
  owner,
}) => {
  const theme = useTheme()
  const navigation = useRootNavigation()
  const progressBarValue = useMemo(
    () => completedTasksCount / allTasksCount,
    [allTasksCount, completedTasksCount],
  )
  const handleOpenProject = () =>
    navigation.navigate(Routes.Project, {
      projectId: _id,
    })

  return (
    <BaseCard
      onPress={handleOpenProject}
      mode={'elevated'}
      theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
    >
      <BaseCard.Cover
        source={{
          uri: image,
        }}
      />
      <Title
        title={name}
        titleVariant={'titleLarge'}
        subtitle={
          <Info>
            <InfoChip>
              <Icon size={16} source={'checkbox-marked-circle'} />
              <Text>
                {completedTasksCount} / {allTasksCount}
              </Text>
            </InfoChip>
          </Info>
        }
      />
      <Content>
        <ProgressBar animatedValue={progressBarValue} />
      </Content>
      <BaseCard.Actions>
        <Text>
          {owner.last_name} {owner.first_name}
        </Text>
        <Avatar.Image
          size={36}
          source={{
            uri: owner.avatar,
          }}
        />
      </BaseCard.Actions>
    </BaseCard>
  )
}
