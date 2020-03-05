import React, { forwardRef } from 'react'
import cx from 'classnames'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import BaseComponent from './baseComponent'
import Icon from './icon'

const Button = forwardRef((props, ref) => {
  const { className, type, theme, themeCss = {}, isSelected = false, disabled = false, iconShow = true, icon, iconPosition = 'left' } = props
  const themeConfig = theme.config
  
  const themeStyle = themeConfig? {
    color: getCSS(themeConfig.button.fontColor),
    boxShadow: `1px 1px 3px ${getCSS(themeConfig.button.shadowColor)}`,
    backgroundColor: getCSS(themeConfig.button.backgroundColor),
    borderColor: `${getCSS(themeConfig.button.borderColorTop)} ${getCSS(themeConfig.button.borderColorRight)} 
      ${getCSS(themeConfig.button.borderColorBottom)} ${getCSS(themeConfig.button.borderColorLeft)}`,
    ':hover': {
      color: getCSS(themeConfig.button.hover.fontColor),
      backgroundColor: getCSS(themeConfig.button.hover.backgroundColor)
    },
    '&.selected, &.active, :active': {
      color: getCSS(themeConfig.button.active.fontColor),
      backgroundColor: getCSS(themeConfig.button.active.backgroundColor),
    },
    '&.disabled:hover, &.disabled:active, :disabled:hover, :disabled:active': {
      color: getCSS(themeConfig.button.fontColor),
      backgroundColor: getCSS(themeConfig.button.backgroundColor),
    },
    ...themeCss
  }: themeCss

  const buttonClass = cx('button', className, { [`button-${type}`]: type })
  const iconClass = cx('icon-current', {'icon-loading': icon=='loading', 'icon-left': iconPosition == 'left', 'icon-right': iconPosition == 'right'})
  const renderChildComponent = iconShow && icon? () => <Icon type={icon} key='button_icon' className={iconClass}/>: null
  return (
    <BaseComponent
      {...props}
      className={buttonClass}
      domType={'div'}
      themeCss={themeStyle}
      ref={ref}
      isOperator={false}
      renderChildComponent={renderChildComponent}
    >
    </BaseComponent>
  )
})

export default withThemeContext(Button)