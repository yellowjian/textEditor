import React from 'react'
import { forwardRef, Fragment } from 'react'
import cx from 'classnames'
import BaseComponent from '../baseComponent'
import CheckBox from '../checkbox'
import RadioBox from '../radiobox'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'

const DropdownItem = forwardRef((props, ref) => {
  const {
    className,
    multiple = false,
    pureMenu = false,
    theme,
    themeCss = {},
    label
  } = props
  const itemClass = cx('dropdown-item', className)
  const themeConfig = theme.config
  const themeStyle = themeConfig ?{
    backgroundColor: getCSS(themeConfig.button.backgroundColor),
    borderColor: `${getCSS(themeConfig.button.borderColorTop)} ${getCSS(themeConfig.button.borderColorRight)} 
      ${getCSS(themeConfig.button.borderColorBottom)} ${getCSS(themeConfig.button.borderColorLeft)}`,
    ':hover': {
      backgroundColor: getCSS(themeConfig.dropdown.hover.backgroundColor)
    },
    ...themeCss
  }: themeCss

  const component = (
    pureMenu ?
      <BaseComponent {...props} className={itemClass} themeCss={themeStyle} ref={ref}/>
      :
      multiple ?
        <CheckBox {...props} className={itemClass} themeCss={themeStyle}>
        </CheckBox>
        :
        <RadioBox {...props} className={itemClass} themeCss={themeStyle}>
        </RadioBox>
  )
  return (
    <Fragment>
      {component}
    </Fragment>
  )
})

export default withThemeContext(DropdownItem)