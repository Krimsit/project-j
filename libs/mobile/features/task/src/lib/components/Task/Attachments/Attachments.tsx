import { useState, useEffect } from 'react'
import { IconButton, Text } from 'react-native-paper'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import { useTaskQuery, useUpdateTaskAttachmentsMutation } from '../../../hooks'

import { Container, Title, Images, Image } from './Attachments.styles'

import type { FC } from 'react'
import type { UploadFileProps } from '@shared/models'

export const Attachments: FC = () => {
  const { data } = useTaskQuery()
  const [updateAttachments] = useUpdateTaskAttachmentsMutation()
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

          void updateAttachments({
            variables: {
              taskId: data?.getTask._id ?? '',
              value: {
                attachments,
              },
            },
          })
        }
      }
    })
  }

  useEffect(() => {
    if (data?.getTask.attachments) {
      setImages(data.getTask.attachments)
    }
  }, [data?.getTask.attachments])

  return (
    <Container>
      <Title>
        <Text variant={'bodyMedium'}>Attachments</Text>
        <IconButton icon={'plus'} onPress={handleChoosePhoto} />
      </Title>
      {images.length !== 0 && (
        <Images>
          {images.map((image, index) => (
            <Image
              key={`${image}_${index}`}
              source={{
                uri: image,
              }}
            />
          ))}
        </Images>
      )}
    </Container>
  )
}
