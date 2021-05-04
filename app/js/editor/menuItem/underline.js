import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'

function Underline(props) {
  const { initVal, initStatus, theme, pureMenu = false } = props
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
  const italicClick = (e) => {
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if(isSeleEmpty) {
      editor.selection.createEmptyRange()
    }
    editor.cmd.execCmd('underline')
    if (isSeleEmpty) {
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  return (
    <div className="underline">
      <i
        className={`menu-icon-underline ` + (initStatus.underline ? 'active': '')}
        css={menuIconTheme}
        onClick={italicClick}
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

export default connect(mapStateToProps)(withThemeContext(Underline))
