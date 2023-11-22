import { Text, Button } from 'react-native-paper'
import { useNavigation } from '@mobile/hooks'
import { ProjectCard } from '@mobile/ui'
import { Routes } from '@mobile/models'

import { Container, Title, List } from './Projects.styles'

import type { FC } from 'react'

export const Projects: FC = () => {
  const navigation = useNavigation()
  const handleOpenAllProjects = () =>
    navigation.navigate(Routes.Projects, {
      screen: Routes.AllProjects,
    })

  return (
    <Container>
      <Title>
        <Text variant={'titleMedium'}>Ongoing projects (2)</Text>
        <Button mode={'text'} onPress={handleOpenAllProjects}>
          See all
        </Button>
      </Title>
      <List>
        <ProjectCard
          _id={'1'}
          image={
            'https://fastly.picsum.photos/id/1021/700/700.jpg?hmac=ldJsatR-G17PNAnHdy7oFdi8EVQoiR3aa-Hd301-7OI'
          }
          name={'Project 1'}
          date={'22.11.2023'}
          ownerAvatar={
            'https://fastly.picsum.photos/id/661/700/700.jpg?hmac=5JIdMAlFpi9buG1brZ-L0gMljQkKHMiFDwiNZVIduUc'
          }
          completedTaskCount={5}
          allTaskCount={10}
          attachmentsCount={4}
        />
        <ProjectCard
          _id={'2'}
          image={
            'https://fastly.picsum.photos/id/1021/700/700.jpg?hmac=ldJsatR-G17PNAnHdy7oFdi8EVQoiR3aa-Hd301-7OI'
          }
          name={'Project 2'}
          date={'22.11.2023'}
          ownerAvatar={
            'https://fastly.picsum.photos/id/661/700/700.jpg?hmac=5JIdMAlFpi9buG1brZ-L0gMljQkKHMiFDwiNZVIduUc'
          }
          completedTaskCount={5}
          allTaskCount={10}
          attachmentsCount={4}
        />
      </List>
    </Container>
  )
}
