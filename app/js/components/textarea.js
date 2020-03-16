import React, { forwardRef } from 'react'
import cx from 'classnames'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import BaseComponent from './baseComponent'

const TextArea = forwardRef((props, ref) => {
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

  const textAreaClass = cx('input scrollbar-y', className)
  const textAreaExtraProps = ['onChange', 'value', 'placeholder', 'type', 'rows', 'cols'].concat(extraProps)
  return (
    <BaseComponent
      {...props}
      className={textAreaClass}
      domType={'textarea'}
      themeCss={themeStyle}
      ref={ref}
      isOperator={false}
      extraProps={textAreaExtraProps}
    >
    </BaseComponent>
  )
})

export default withThemeContext(TextArea)