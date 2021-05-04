import { useState, Fragment, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import cx from 'classnames'
import { jsx } from '@emotion/core'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'

const BaseComponent = forwardRef((props, ref) => {
  const {
    domType = 'div',
    className,
    style = {},
    themeCss,
    label,
    isSelected = false,
    disabled = false,
    renderChildComponent = null,
    iconPosition = 'left',
    onClick,
    theme,
    isOperator = true,
    extraProps = [],
  } = props
  const themeConfig = theme.config
  const basicRef = useRef()
  const [selected, setSelected] = useState()

  useEffect(() => {
    setSelected(isSelected)
  }, [isSelected])

  useImperativeHandle(ref, () => ({ 'el': basicRef.current, 'selected': selected }))

  const themeStyle = themeConfig ? {
    'color': getCSS(themeConfig.linkColor),
    '&.selected': {
      color: getCSS(themeConfig.selectedColor)
    },
  } : {}
  const basicClass = cx('basic', { 'selected': selected, 'disabled': disabled }, className)
  
  const itemClick = () => {
    if (disabled) return
    isOperator && setSelected(!selected)
    onClick && onClick()
  }

  const basicProps = {
    className: basicClass,
    style: style,
    onClick: itemClick,
    ref: basicRef,
    css: {...themeStyle, ...themeCss},
    ...extraProps.reduce((obj, key) => ({...obj, [key]: props[key]}), {})
  }

  const renderContent = () => {
    let content = []
    renderChildComponent && content.push(renderChildComponent())
    label && content.push(label)
    if (iconPosition == 'right') content.reverse()
    return content
  }
  const isInput = (domType == 'input' || domType == 'textarea')

  const component = jsx(domType, basicProps, !isInput ? renderContent() : null)
  return (
    <Fragment>
      {component}
    </Fragment>
  )
})

export default withThemeContext(BaseComponent)