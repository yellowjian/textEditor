import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../../utils/constants'

function Head(props) {
  const { theme, pureMenu = false } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const headRef = useRef()
  const customBtn = () => {
    return <i className={`menu-icon-header`} css={menuIconTheme}></i>
  }
  return (
    <div className="head" ref={headRef}>
      <Dropdown
        options={constants.headOptions}
        width={200}
        customBtn={customBtn()}
        value="H1"
        onChange={val => console.log(val)}
      ></Dropdown>
    </div>
  )
}
export default withThemeContext(Head)
