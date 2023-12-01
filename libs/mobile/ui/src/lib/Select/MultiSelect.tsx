import { useState, useEffect } from 'react'
import { Modal, Button, Portal, Searchbar, Checkbox } from 'react-native-paper'

import { Content, List, Footer } from './Select.styles'

import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { MultiSelectProps } from './Select.types'

export const MultiSelect = <T,>({
  isOpen,
  onClose,
  onApply,
  value,
  values,
  searchField,
  valueField,
  labelField,
  loading,
}: MultiSelectProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [checkedValues, setCheckedValues] = useState<T[]>([])
  const [filteredValues, setFilteredValues] = useState<T[]>(values)

  const handleClose = () => {
    setSearchValue('')
    setFilteredValues(values)
    setCheckedValues([])
    onClose()
  }

  const handleApply = () => {
    onApply(checkedValues)
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
    const isValueExist = checkedValues.find((value) => value[valueField] === id)

    if (isValueExist) {
      const newCheckedValues = checkedValues.filter(
        (value) => value[valueField] !== id,
      )

      setCheckedValues(newCheckedValues)
    } else {
      setCheckedValues([...checkedValues, newValue])
    }
  }

  useEffect(() => {
    setFilteredValues(values)
  }, [values, isOpen])

  useEffect(() => {
    if (isOpen) {
      setCheckedValues(value ?? [])
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
              const isValueExist = checkedValues.find(
                (value) => value[valueField] === item[valueField],
              )
              const status = isValueExist ? 'checked' : 'unchecked'

              return (
                <Checkbox.Item
                  key={String(item[valueField])}
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
