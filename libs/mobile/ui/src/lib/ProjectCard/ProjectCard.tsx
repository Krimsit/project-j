import { useTheme } from 'styled-components'
import { useMemo } from 'react'
import {
  Card as BaseCard,
  Text,
  Avatar,
  Icon,
  ProgressBar,
} from 'react-native-paper'
import { useNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { InfoChip, Info, Title, Content } from './ProjectCard.styles'

import type { FC } from 'react'
import type { ProjectCardProps } from './ProjectCard.types'

export const ProjectCard: FC<ProjectCardProps> = ({
  _id,
  completedTaskCount,
  allTaskCount,
  attachmentsCount,
  image,
  date,
  name,
  ownerAvatar,
}) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const progressBarValue = useMemo(
    () => completedTaskCount / allTaskCount,
    [allTaskCount, completedTaskCount],
  )
  const handleOpenProject = () =>
    navigation.navigate(Routes.Projects, {
      screen: Routes.Project,
      params: { projectId: _id },
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
              <Icon size={16} source={'calendar-blank'} />
              <Text>{date}</Text>
            </InfoChip>
            <InfoChip>
              <Icon size={16} source={'attachment'} />
              <Text>{attachmentsCount}</Text>
            </InfoChip>
            <InfoChip>
              <Icon size={16} source={'checkbox-marked-circle'} />
              <Text>
                {completedTaskCount} / {allTaskCount}
              </Text>
            </InfoChip>
          </Info>
        }
      />
      <Content>
        <ProgressBar animatedValue={progressBarValue} />
      </Content>
      <BaseCard.Actions>
        <Text>Owner</Text>
        <Avatar.Image
          size={36}
          source={{
            uri: ownerAvatar,
          }}
        />
      </BaseCard.Actions>
    </BaseCard>
  )
}
