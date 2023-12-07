import { useEffect, useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { TaskCard } from '@mobile/ui'

import {
  ColumnContainer,
  ColumnTitle,
  ColumnTaskList,
  ColumnNoData,
} from './common.styles'

import type { FC } from 'react'
import type { ColumnProps } from './common.types'

export const Column: FC<ColumnProps> = ({ cards, title }) => {
  const [currentWidth, setCurrentWidth] = useState<number>(0)

  useEffect(() => {
    const currentWidth = Dimensions.get('screen').width

    setCurrentWidth(currentWidth)
  }, [])

  return (
    <ColumnContainer $width={currentWidth}>
      <ColumnTitle>
        <Text variant={'titleMedium'}>
          {title} ({cards.length})
        </Text>
      </ColumnTitle>
      <ScrollView>
        <ColumnTaskList>
          {cards.length !== 0 ? (
            cards.map((card) => <TaskCard key={card._id} {...card} />)
          ) : (
            <ColumnNoData>
              <Text>No tasks</Text>
            </ColumnNoData>
          )}
        </ColumnTaskList>
      </ScrollView>
    </ColumnContainer>
  )
}
