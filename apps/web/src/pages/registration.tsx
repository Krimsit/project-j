import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Title,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { registrationRequestScheme } from '@shared/types'
import { useRegistration } from '@dto/auth'

import type { FC } from 'react'
import type { RegistrationRequest } from '@shared/types'

const defaultValues: RegistrationRequest = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  midName: '',
}

const RegistrationPage: FC = () => {
  const { mutate, status } = useRegistration()
  const form = useForm<RegistrationRequest>({
    mode: 'uncontrolled',
    initialValues: defaultValues,
    validate: zodResolver(registrationRequestScheme),
  })

  const handleSuccess = (values: RegistrationRequest) => mutate(values)

  return (
    <Fragment>
      <Title mb={'md'}>Регистрация</Title>
      <form onSubmit={form.onSubmit(handleSuccess)}>
        <Flex direction={'column'} gap={'md'}>
          <TextInput
            key={form.key('email')}
            label={'Email'}
            placeholder={'your@email.com'}
            withAsterisk
            {...form.getInputProps('email')}
          />
          <TextInput
            key={form.key('username')}
            label={'Логин'}
            placeholder={'username'}
            withAsterisk
            {...form.getInputProps('username')}
          />
          <TextInput
            key={form.key('lastName')}
            label={'Фамилия'}
            placeholder={'Иванов'}
            withAsterisk
            {...form.getInputProps('lastName')}
          />
          <TextInput
            key={form.key('firstName')}
            label={'Имя'}
            placeholder={'Иван'}
            withAsterisk
            {...form.getInputProps('firstName')}
          />
          <TextInput
            key={form.key('midName')}
            label={'Отчество'}
            placeholder={'Иванович'}
            {...form.getInputProps('midName')}
          />
          <PasswordInput
            key={form.key('password')}
            label={'Пароль'}
            placeholder={'Qwerty@123'}
            withAsterisk
            {...form.getInputProps('password')}
          />
          <Flex
            direction={'row'}
            gap={'sm'}
            align={'center'}
            justify={'space-between'}
            flex={1}
          >
            <Anchor component={Link} to={'/authentication/login'}>
              Вход
            </Anchor>
            <Button type={'submit'} loading={status === 'pending'}>
              Зарегистрироваться
            </Button>
          </Flex>
        </Flex>
      </form>
    </Fragment>
  )
}

export default RegistrationPage
