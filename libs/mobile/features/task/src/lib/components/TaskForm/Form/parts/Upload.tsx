import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { HelperText, IconButton, Text } from 'react-native-paper'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import {
  RowContainer,
  UploadImage,
  UploadTitle,
  UploadImages,
} from './common.styles'

import type { FC } from 'react'

export const Upload: FC = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()
  const value = getValues('image') as string[] | undefined
  const error = errors.image
  const [images, setImages] = useState<string[]>([])

  const handleChoosePhoto = () => {
    void launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
    }).then((result) => {
      if (!result.canceled) {
        if (result.assets?.[0].uri) {
          const newImages = result.assets?.map((item) => item.uri)
          const value = [...images, ...newImages]

          setValue('images', value)
          setImages(value)
        }
      }
    })
  }

  useEffect(() => {
    setImages(value ?? [])
  }, [value])

  return (
    <RowContainer>
      <UploadTitle>
        <Text variant={'bodyMedium'}>Attachments</Text>
        <IconButton icon={'plus'} onPress={handleChoosePhoto} />
      </UploadTitle>
      {images.length !== 0 && (
        <UploadImages>
          {images.map((image, index) => (
            <UploadImage
              key={`${image}_${index}`}
              source={{
                uri: image,
              }}
            />
          ))}
        </UploadImages>
      )}
      <HelperText type={'error'} visible={Boolean(error)}>
        {String(error?.message)}
      </HelperText>
    </RowContainer>
  )
}
