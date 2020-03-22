import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import constants from '../constants'
import UA from '../ua'

function Quote(props) {
  const { theme, data } = props
  const themeConfig = theme.config
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const quoteClick = () => {
    const selectionElem = editor.selection.getSelectionContainerElem()
    const nodeName = selectionElem.nodeName
    if (!UA.isIE()) {
      if (nodeName === 'BLOCKQUOTE') {
        // 撤销 quote
        editor.cmd.execCmd('formatBlock', '<P>')
      } else {
        // 转换为 quote
        editor.cmd.execCmd('formatBlock', '<BLOCKQUOTE>')
      }
      return
    }
    let content = void 0
    let targetELem = void 0;
    content = selectionElem.innerText
    if (nodeName === 'P') {
      // 将 P 转换为 quote
      targetELem = document.createElement('blockquote')
      targetELem.innerText = content
      targetELem.insertAfter(selectionElem)
      selectionElem.remove()
      return
    }
    if (nodeName === 'BLOCKQUOTE') {
      // 撤销 quote
      targetELem = document.createElement('p')
    }
    targetELem.innerText = content
    targetELem.insertAfter(selectionElem)
    selectionElem.remove()
  }
  return (
    <div className="quote">
      <i
        className={`menu-icon-quotes-left`}
        css={menuIconTheme}
        onClick={quoteClick}
      ></i>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}
export default withThemeContext(connect(mapStateToProps)(Quote))
