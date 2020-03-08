import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../../utils/constants'

function Strikethrough(props) {
  const { data, theme, pureMenu = false } = props
  const themeConfig = theme.config
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const strikeThroughClick = (e) => {
    let isSeleEmpty = editor.selection.isSelectionEmpty()
    if(isSeleEmpty) {
      editor.selection.createEmptyRange()
    }
    editor.cmd.execCmd('strikethrough')
    if (isSeleEmpty) {
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  return (
    <div className="strikethrough">
      <i
        className={`menu-icon-strikethrough`}
        css={menuIconTheme}
        onClick={strikeThroughClick}
      ></i>
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(withThemeContext(Strikethrough))
