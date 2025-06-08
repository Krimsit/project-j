import { Modal, TextInput, Flex, Button, Textarea, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { createProjectSchema } from '@shared/types'
import { useCreateProjects } from '@dto/project'

import type { FC } from 'react'
import type { CreateProjectRequest } from '@shared/types'

export type CreateModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const { mutateAsync, isPending } = useCreateProjects()
  const form = useForm<CreateProjectRequest>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
    },
    validate: zodResolver(createProjectSchema),
  })

  const handleSuccess = async (values: CreateProjectRequest) => {
    await mutateAsync(values)
    onClose()
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title={'Изменить информацию'}>
      <form onSubmit={form.onSubmit(handleSuccess)}>
        <Flex direction={'column'} gap={'md'}>
          <TextInput
            key={form.key('name')}
            label={'Название'}
            placeholder={'Мой проект'}
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Textarea
            key={form.key('description')}
            label={'Описание'}
            placeholder={'Описание проекта'}
            {...form.getInputProps('description')}
          />
          <Group gap={'md'} justify={'flex-end'}>
            <Button onClick={onClose} variant={'subtle'}>
              Отмена
            </Button>
            <Button type={'submit'} loading={isPending}>
              Создать
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}

export default CreateModal
