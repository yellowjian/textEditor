import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'

function Redo(props) {
  const { editor, theme } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const redoClick = (e) => {
    editor.cmd.execCmd('redo')
  }
  return (
    <div className="redo">
      <i
        className={`menu-icon-redo`}
        css={menuIconTheme}
        onClick={redoClick}
        title='重做'
      ></i>
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    editor: state.editor,
  }
}

export default connect(mapStateToProps)(withThemeContext(Redo))
