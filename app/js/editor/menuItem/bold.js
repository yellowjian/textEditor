import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'

function Bold(props) {
  const { initStatus, editor, theme, pureMenu = false } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    },
    '&.active': {
      color: getCSS(themeConfig.button.visible.fontColor)
    }
  })
  const boldClick = (e) => {
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if(isSeleEmpty) {
      editor.selection.createEmptyRange()
    }
    editor.cmd.execCmd('bold')
    if (isSeleEmpty) {
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  return (
    <div className="bold">
      <i
        className={`menu-icon-bold ` + (initStatus.bold ? 'active': '')}
        css={menuIconTheme}
        onClick={boldClick}
        title='字体粗细'
      ></i>
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    initStatus: state.menuItemStatus,
    editor: state.editor,
  }
}

export default connect(mapStateToProps)(withThemeContext(Bold))
