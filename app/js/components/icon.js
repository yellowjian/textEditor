import React, {Fragment} from 'react'
import cx from 'classnames'
import { getCSS } from '../utils/utils'
import withThemeContext from '../hoc/withThemeContext'
import { jsx, css } from '@emotion/core'

function Icon(props) {
  const { className, theme, themeCss = {}, type } = props
  const iconClass = cx('icon', className)
  const themeConfig = theme.config

  const themeStyle = themeConfig ? {
    fill: getCSS(themeConfig.icon.fontColor),
  }: {}

  const basicProps = {
    className: iconClass,
    css: {...themeStyle},
  }
  const renderContent = () => {
    return (
      <use xlinkHref={`#icon${type}`}></use>
    )
  }
  const component = jsx('svg', basicProps, renderContent())
  return (
    <Fragment>
      {component}
    </Fragment>
  )
}
export default withThemeContext(Icon)