import React, { forwardRef } from 'react'
import cx from 'classnames'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import BaseComponent from './baseComponent'
import Icon from './icon'

const Input = forwardRef((props, ref) => {
  const { className, theme, themeCss = {}, isSelected = false, disabled = false, extraProps = []} = props
  const themeConfig = theme.config
  
  const themeStyle = themeConfig? {
    color: getCSS(themeConfig.input.color),
    backgroundColor: getCSS(themeConfig.input.backgroundColor),
    borderColor: `${getCSS(themeConfig.input.borderColorTop)} ${getCSS(themeConfig.input.borderColorRight)} 
      ${getCSS(themeConfig.input.borderColorBottom)} ${getCSS(themeConfig.input.borderColorLeft)}`,
    '&:not(.disabled):focus': {
      borderColor: getCSS(themeConfig.input.active.borderColor)
    },
    ...themeCss
  }: themeCss

  const inputClass = cx('input', className)
  const inputExtraProps = ['onChange', 'value', 'placeholder', 'type'].concat(extraProps)
  return (
    <BaseComponent
      {...props}
      className={inputClass}
      domType={'input'}
      themeCss={themeStyle}
      ref={ref}
      isOperator={false}
      extraProps={inputExtraProps}
    >
    </BaseComponent>
  )
})

export default withThemeContext(Input)