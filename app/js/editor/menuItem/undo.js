import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'

function Undo(props) {
  const { data, theme } = props
  const themeConfig = theme.config
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const undoClick = (e) => {
    editor.cmd.execCmd('undo')
  }
  return (
    <div className="undo">
      <i
        className={`menu-icon-undo`}
        css={menuIconTheme}
        onClick={undoClick}
        title='撤销'
      ></i>
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(withThemeContext(Undo))
