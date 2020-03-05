import React, { useState, createRef, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Editor from '../editor/editor'
import Menus from '../editor/menus'
import Actions from '../action'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import { css } from '@emotion/core'

function TextEditor(props) {
  const { theme } = props
  const themeConfig = theme.config
  const toolbarRef = useRef()
  const textContainerRef = useRef()
  const textEditorRef = useRef()

  useEffect(() => {
    let editor = new Editor(
      toolbarRef.current,
      textContainerRef.current,
      textEditorRef.current
    )
    // console.log(editor)
    editor.create()
  }, [])

  const textEditorTheme = css({
    backgroundColor: getCSS(themeConfig.input.backgroundColor),
    color: getCSS(themeConfig.input.color),
    borderColor: `${getCSS(themeConfig.input.borderColorTop)} ${getCSS(
      themeConfig.input.borderColorRight
    )} 
      ${getCSS(themeConfig.input.borderColorBottom)} ${getCSS(
      themeConfig.input.borderColorLeft
    )}`,
    '&:not(.disabled):focus': {
      borderColor: getCSS(themeConfig.input.active.borderColor)
    }
  })
  return (
    <div className="edit-area">
      <div ref={toolbarRef} className="toolbar">
        <Menus></Menus>
      </div>
      <div ref={textContainerRef} className="text-container">
        <div
          ref={textEditorRef}
          className="text-editor scrollbar-y"
          css={textEditorTheme}
          contentEditable={true}
        ></div>
      </div>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

const mapDispatchToProps = {
  updateThemeAction: Actions.updateTheme
}
export default withThemeContext(
  connect(mapStateToProps, mapDispatchToProps)(TextEditor)
)