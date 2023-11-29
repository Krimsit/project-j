import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { HelperText } from 'react-native-paper'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import { UploadButton, UploadImage } from './common.styles'

import type { FC } from 'react'
import type { RegistrationForm } from '@shared/models'

export const Upload: FC = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<RegistrationForm>()
  const error = errors.avatar
  const [image, setImage] = useState<string>('')

  const handleChoosePhoto = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      selectionLimit: 1,
      base64: true,
    })

    if (!result.canceled) {
      if (result.assets?.[0]) {
        const { base64, uri, fileName } = result.assets[0]

        setValue('avatar', {
          base64: String(base64),
          filename: String(fileName),
        })
        setImage(uri)
      }
    }
  }

  if (!image) {
    return (
      <View>
        <HelperText type={'info'}>Avatar</HelperText>
        <UploadButton
          size={40}
          icon={'image'}
          mode={'outlined'}
          onPress={handleChoosePhoto}
        />
      </View>
    )
  }

  return (
    <View>
      <UploadImage
        source={{
          uri: image,
        }}
      />
      <HelperText type={'error'} visible={Boolean(error)}>
        {String(error?.message)}
      </HelperText>
    </View>
  )
}
