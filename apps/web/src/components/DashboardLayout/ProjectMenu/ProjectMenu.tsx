import { Flex, Center, Button } from '@mantine/core'

import type { FC } from 'react'

const ProjectMenu: FC = () => {
  return (
    <Flex direction={'column'} gap={'xl'}>
      <Center>
        <Button variant={'filled'} fullWidth>
          Создать проект
        </Button>
      </Center>
    </Flex>
  )
}

export default ProjectMenu
