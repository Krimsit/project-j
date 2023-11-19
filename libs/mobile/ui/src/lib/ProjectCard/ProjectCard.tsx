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

import { Card, InfoChip, Info, Title, Content } from './ProjectCard.styles'

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
    <Card onPress={handleOpenProject}>
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
        right={() => (
          <Avatar.Image
            size={36}
            source={{
              uri: ownerAvatar,
            }}
          />
        )}
      />
      <Content>
        <ProgressBar animatedValue={progressBarValue} />
      </Content>
    </Card>
  )
}
