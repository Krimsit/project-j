import { Modal, TextInput, Flex, Button, Textarea, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { createBoardSchema } from '@shared/types'
import { useBoard, useUpdateBoard } from '@dto/board'

import type { FC } from 'react'
import type { UpdateBoardRequest } from '@shared/types'

export type UpdateModalProps = {
  isOpen: boolean
  onClose: () => void
}

const UpdateModal: FC<UpdateModalProps> = ({ isOpen, onClose }) => {
  const { data } = useBoard()
  const { mutateAsync, isPending } = useUpdateBoard()
  const form = useForm<UpdateBoardRequest>({
    mode: 'uncontrolled',
    initialValues: {
      name: data?.name,
      description: data?.description,
    },
    validate: zodResolver(createBoardSchema),
  })

  const handleSuccess = async (values: UpdateBoardRequest) => {
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
              Обновить
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}

export default UpdateModal
