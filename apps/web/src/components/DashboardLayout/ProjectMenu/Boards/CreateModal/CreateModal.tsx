import { Modal, TextInput, Flex, Button, Textarea, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { createBoardSchema } from '@shared/types'
import { useCreateBoard } from '@dto/board'

import type { FC } from 'react'
import type { CreateBoardRequest } from '@shared/types'

export type CreateModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const { mutateAsync, isPending } = useCreateBoard()
  const form = useForm<CreateBoardRequest>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
    },
    validate: zodResolver(createBoardSchema),
  })

  const handleSuccess = async (values: CreateBoardRequest) => {
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
            placeholder={'Моя доска'}
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Textarea
            key={form.key('description')}
            label={'Описание'}
            placeholder={'Описание доски'}
            {...form.getInputProps('description')}
          />
          <Group gap={'md'} justify={'flex-end'}>
            <Button onClick={onClose} variant={'subtle'}>
              Отмена
            </Button>
            <Button type={'submit'} loading={isPending}>
              Добавить
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}

export default CreateModal
