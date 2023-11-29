import type { InputModeOptions } from 'react-native/Libraries/Components/TextInput/TextInput'
import type { RegistrationForm } from '@shared/models'

export type TextFieldProps = {
  name: keyof Omit<RegistrationForm, 'avatar'>
  label: string
  placeholder: string
  secureTextEntry?: boolean
  inputMode?: InputModeOptions
}
