import { useState, useEffect } from 'react'
import {
  Modal,
  Button,
  Portal,
  Searchbar,
  RadioButton,
} from 'react-native-paper'

import { Content, List, Footer } from './Select.styles'

import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { SelectProps } from './Select.types'

export const Select = <T,>({
  isOpen,
  onClose,
  onApply,
  value,
  values,
  searchField,
  valueField,
  labelField,
  loading,
}: SelectProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [checkedValue, setCheckedValue] = useState<T | undefined>(undefined)
  const [filteredValues, setFilteredValues] = useState<T[]>(values)

  const handleClose = () => {
    setSearchValue('')
    setFilteredValues(values)
    setCheckedValue(undefined)
    onClose()
  }

  const handleApply = () => {
    onApply(checkedValue)
    handleClose()
  }

  const handleSearch = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchValue(text)

    const foundedValues = searchField
      ? values.filter((item) =>
          String(item[searchField]).toLowerCase().includes(text.toLowerCase()),
        )
      : values

    setFilteredValues(foundedValues ?? [])
  }

  const handleCheck = (newValue: T) => () => {
    const id = String(newValue[valueField])
    const isValueExist = String(checkedValue?.[valueField]) === id

    setCheckedValue(isValueExist ? undefined : newValue)
  }

  useEffect(() => {
    setFilteredValues(values)
  }, [values, isOpen])

  useEffect(() => {
    if (isOpen) {
      setCheckedValue(value)
    }
  }, [isOpen, value])

  return (
    <Portal>
      <Modal visible={isOpen} onDismiss={handleClose}>
        <Content>
          {searchField && (
            <Searchbar
              value={searchValue}
              onChange={handleSearch}
              placeholder={'Find'}
            />
          )}
          <List>
            {filteredValues.map((item) => {
              const isValueExist =
                checkedValue?.[valueField] === item[valueField]
              const status = isValueExist ? 'checked' : 'unchecked'

              return (
                <RadioButton.Item
                  key={String(item[valueField])}
                  value={String(item[valueField])}
                  label={String(item[labelField])}
                  onPress={handleCheck(item)}
                  status={status}
                />
              )
            })}
          </List>
          <Footer>
            <Button mode={'outlined'} onPress={handleClose} disabled={loading}>
              Close
            </Button>
            <Button
              mode={'contained'}
              onPress={handleApply}
              disabled={loading}
              loading={loading}
            >
              Apply
            </Button>
          </Footer>
        </Content>
      </Modal>
    </Portal>
  )
}
