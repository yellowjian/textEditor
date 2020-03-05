import React, { forwardRef, useState, useEffect } from 'react'
import cx from 'classnames'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import RadioBox from './radiobox'

const RadioBoxGroup = forwardRef((props, ref) => {
  const { options, onClick, value, className } = props

  const buttonGroupClass = cx('radiobox-group', className)

  const [selectItem, setSelectItem] = useState('')

  useEffect(() => {
    setSelectItem(value)
  }, [value])

  const onRadioBoxClick = (e, option) => {
    if(option == selectItem) return 
    onClick && onClick(e, option)
    setSelectItem(option)
  }
  return (
    <div className={buttonGroupClass}>
      {options.map((item, index) => {
        const radioboxProps = {
          label: item.label,
          key: `radiobox_group_${index}`,
          onClick: (e)=>onRadioBoxClick(e, item.value),
          isSelected: item.value == selectItem,
          ...item
        }
        return <RadioBox {...radioboxProps}/>
      })}
    </div>
  )
})

export default RadioBoxGroup