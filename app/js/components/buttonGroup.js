import React, { forwardRef, useState, useEffect } from 'react'
import cx from 'classnames'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import Button from './button'

const ButtonGroup = forwardRef((props, ref) => {
  const { options, onClick, value, className } = props

  const buttonGroupClass = cx('button-group', className)

  const [selectItem, setSelectItem] = useState('')

  useEffect(() => {
    setSelectItem(value)
  }, [value])

  const onButtonClick = (e, option) => {
    if(option == selectItem) return 
    onClick && onClick(e, option)
    setSelectItem(option)
  }
  return (
    <div className={buttonGroupClass}>
      {options.map((item, index) => {
        const buttonProps = {
          label: item.label,
          key: `button_group_${index}`,
          onClick: (e)=>onButtonClick(e, item.value),
          isSelected: item.value == selectItem,
          icon: item.icon,
          iconPosition: item.iconPosition,
          ...item
        }
        return <Button {...buttonProps}/>
      })}
    </div>
  )
})

export default ButtonGroup