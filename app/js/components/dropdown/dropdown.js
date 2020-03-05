import React, { forwardRef, Fragment, useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import Button from '../button'
import Icon from '../icon'
import DropdownItem from './dropdownItem'
import Modal from '../modal'
import { getCSS } from '../../utils/utils'

let uniqueCode = 0

const Dropdown = forwardRef((props, ref) => {
  const {
    className,
    width = 200,
    options = [],
    multiple = false,
    value,
    themeCss = {},
    pureMenu = false,
    customBtn = null,
    onChange,
    content
  } = props

  const dropdownRef = useRef()
  const [id, setId] = useState(`dropdown_${uniqueCode++}`)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [selectedVals, setSelectedVals] = useState([].concat(value))
  const [filterOptions, setFilterOptions] = useState([])

  useEffect(() => {
    setFilterOptions(options.filter(item => !item.disabled))
  }, [options])
  useEffect(() => {
    setSelected(value)
  }, [value])
  const dropdownClass = cx('dropdown', { active: isOpen }, className)
  const menuClass = cx('dropdown-menu scrollbar-y', { 'pure-menu': pureMenu })

  let isBindGlobalEvent = false

  const open = () => {
    bindGlobalEvent()
    setIsOpen(true)
  }
  const close = () => {
    offGlobalEvent()
    setIsOpen(false)
  }
  const bindGlobalEvent = () => {
    if (!isBindGlobalEvent) {
      document.addEventListener('mousedown', mouseDownHandle, false)
      window.addEventListener('resize', close)
      isBindGlobalEvent = true
    }
  }
  const offGlobalEvent = () => {
    document.removeEventListener('mousedown', mouseDownHandle, false)
    window.removeEventListener('resize', close)
    isBindGlobalEvent = false
  }
  const mouseDownHandle = e => {
    if (e.target.closest(`#${id} .button, .dropdown-menu`)) {
      return
    }
    close()
  }
  const itemClick = item => {
    if (!multiple) {
      setSelectedVals([].concat(item.value))
      onChange && onChange(item.value)
      close()
    } else {
      let vals = []
      if (Object.keys(item).length == 0) {
        if (selectedVals.length == filterOptions.length) {
          setSelectedVals(vals)
        } else {
          vals = filterOptions.map(item => item.value)
          setSelectedVals(vals)
        }
      } else {
        if (selectedVals.indexOf(item.value) == -1) {
          vals = selectedVals.concat(item.value)
        } else {
          const index = selectedVals.indexOf(item.value)
          selectedVals.splice(index, 1)
          vals = [].concat(selectedVals)
        }
        setSelectedVals(vals)
      }
      onChange && onChange(vals)
    }
  }
  const onButtonClick = e => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }
  const getContent = () => {
    return content ? (
      { content }
    ) : (
      <Fragment>
        {multiple && (
          <DropdownItem
            {...props}
            label={'Select All'}
            isSelected={selectedVals.length == filterOptions.length}
            onClick={() => itemClick({})}
          ></DropdownItem>
        )}
        {options.map((item, index) => {
          return (
            <DropdownItem
              key={index}
              {...props}
              label={item.label}
              isSelected={selectedVals.indexOf(item.value) != -1}
              disabled={item.disabled}
              onClick={() => itemClick(item)}
            ></DropdownItem>
          )
        })}
      </Fragment>
    )
  }
  const getCurLabel = selectedVals => {
    const curOption = options.filter(item =>
      item.value == selectedVals ? selectedVals[0] : ''
    )
    return curOption.length ? curOption[0].label : ''
  }
  const btnLabel = multiple
    ? `Selected (${selectedVals.length})`
    : getCurLabel(selectedVals)
  return (
    <div className={dropdownClass} id={id} ref={dropdownRef}>
      {customBtn ? (
        <div onClick={e => onButtonClick(e)}>{customBtn}</div>
      ) : (
        <Button
          themeCss={{ width: width }}
          label={btnLabel}
          icon="arrow_down"
          iconPosition="right"
          onClick={e => onButtonClick(e)}
        />
      )}
      <Modal
        className={menuClass}
        isShow={isOpen}
        modalRoot={dropdownRef.current ? dropdownRef.current : null}
      >
        {getContent()}
      </Modal>
    </div>
  )
})
export default Dropdown
