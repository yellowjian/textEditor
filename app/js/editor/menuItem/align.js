import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../constants'

function Align(props) {
  const { theme, data } = props
  const themeConfig = theme.config
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    },
  })
  const headRef = useRef()
  const customBtn = () => {
    return <i className={`menu-icon-paragraph-left`} css={menuIconTheme}></i>
  }
  const handleChange = (val) => {
    editor.cmd.execCmd(val)
  }
  return (
    <div className="head" ref={headRef}>
      <Dropdown
        options={constants.justifyOptions}
        width={200}
        customBtn={customBtn()}
        value={''}
        onChange={handleChange}
      ></Dropdown>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}
export default withThemeContext(connect(mapStateToProps)(Align))
