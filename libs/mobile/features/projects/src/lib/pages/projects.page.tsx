import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Routes } from '@mobile/models'

import { ProjectsFeature, ProjectFeature } from '../feature'

import type { FC } from 'react'
import type { ProjectRoutes } from '@mobile/models'

const Stack = createNativeStackNavigator<ProjectRoutes>()
const Projects: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.AllProjects} component={ProjectsFeature} />
    <Stack.Screen
      name={Routes.Project}
      component={ProjectFeature}
      options={{
        animation: 'none',
      }}
    />
  </Stack.Navigator>
)

export default Projects
