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
import type { TaskForm, UploadFileProps } from '@shared/models'

export const Upload: FC = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<TaskForm>()
  const error = errors.attachments
  const [images, setImages] = useState<string[]>([])

  const handleChoosePhoto = () => {
    void launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
    }).then((result) => {
      if (!result.canceled) {
        if (result.assets) {
          const attachments: UploadFileProps[] = result.assets.map((item) => ({
            base64: item.base64 ?? '',
            filename: item.fileName ?? '',
          }))
          const newImages: string[] = result.assets.map((item) => item.uri)

          setImages([...images, ...newImages])

          setValue('attachments', attachments, {
            shouldValidate: true,
          })
          setImages(newImages)
        }
      }
    })
  }

  useEffect(() => {
    setValue('attachments', [])
  }, [setValue])

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
