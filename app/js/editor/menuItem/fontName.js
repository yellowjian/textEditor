import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../constants'

function FontName(props) {
  const { theme } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const fontRef = useRef()
  const customBtn = () => {
    return <i className={`menu-icon-font`} css={menuIconTheme}></i>
  }
  return (
    <div className="font-name" ref={fontRef}>
      <Dropdown
        options={constants.fontNameOptions}
        width={200}
        customBtn={customBtn()}
        value="宋体"
        onChange={val => console.log(val)}
      ></Dropdown>
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(withThemeContext(FontName))
