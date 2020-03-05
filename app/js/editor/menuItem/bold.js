import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../../utils/constants'

function Bold(props) {
  const { theme, pureMenu = false } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const boldClick = () => {
    console.log('bold click')
  }
  return (
    <div className="bold">
      <i
        className={`menu-icon-bold`}
        css={menuIconTheme}
        onClick={() => boldClick()}
      ></i>
    </div>
  )
}
export default withThemeContext(Bold)
