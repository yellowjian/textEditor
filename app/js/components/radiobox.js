import React from 'react'
import { forwardRef } from 'react'
import cx from 'classnames'
import BaseComponent from './baseComponent'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'

const RadioBox = forwardRef((props, ref) => {
  const { className, theme, themeCss = {} } = props
  const themeConfig = theme.config

  const radioboxClass = cx('radiobox', className)

  const themeStyle = themeConfig
    ? {
        ':not(.disabled):hover': {
          ':before': {
            boxShadow: `1px 1px 0 ${getCSS(
              themeConfig.checkbox.hover.shadowColor
            )}, inset 0 0 3px ${getCSS(themeConfig.checkbox.hover.insetColor)}`
          }
        },
        ':before': {
          backgroundColor: getCSS(themeConfig.checkbox.backgroundColor),
          borderColor: getCSS(themeConfig.checkbox.borderColor),
          boxShadow: `1px 1px 0 ${getCSS(
            themeConfig.checkbox.shadowColor
          )}, inset 1px 1px 1px ${getCSS(themeConfig.checkbox.insetColor)}`
        },
        '&.selected': {
          color: getCSS(themeConfig.linkColor),
          ':after': {
            background: getCSS(themeConfig.checkbox.checked.backgroundColor),
            color: getCSS(themeConfig.checkbox.checked.color)
          }
        },
        ...themeCss
      }
    : themeCss
  return (
    <BaseComponent
      {...props}
      className={radioboxClass}
      themeCss={themeStyle}
      ref={ref}
    ></BaseComponent>
  )
})

export default withThemeContext(RadioBox)
