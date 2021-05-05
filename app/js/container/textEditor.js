import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Editor from '../editor/editor'
import Actions from '../action'
import withThemeContext from '../hoc/withThemeContext'
import { getCSS } from '../utils/utils'
import { css } from '@emotion/core'
import Menus from '../editor/menus'

function TextEditor(props) {
  const { theme, updateEditor, updateMenuItem, updateMenuValue } = props
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
    editor.create()
    updateEditor(editor)
    const saveRange = () => {
      // 随时保存选区
      editor.selection.saveRange()
      // 更新按钮 ative 状态
      const curStatus = editor.changeMenuItemStatus()
      updateMenuItem(curStatus.status)
      updateMenuValue(curStatus.vals)
    }
    const textElem = editor.textElem
    // 按键后保存
    // textElem.addEventListener('keyup', saveRange)
    textElem.addEventListener('mousedown', () => {
      // mousedown 状态下，鼠标滑动到编辑区域外面，也需要保存选区
      textElem.addEventListener('mouseleave', saveRange)
    })
    textElem.addEventListener('mouseup', () => {
      saveRange()
      // 在编辑器区域之内完成点击，取消鼠标滑动到编辑区外面的事件
      textElem.removeEventListener('mouseleave', saveRange)
    })
  }, [])

  const textEditorTheme = css({
    'backgroundColor': getCSS(themeConfig.input.backgroundColor),
    'color': getCSS(themeConfig.input.color),
    'borderColor': `${getCSS(themeConfig.input.borderColorTop)} ${getCSS(
      themeConfig.input.borderColorRight
    )} ${getCSS(themeConfig.input.borderColorBottom)} ${getCSS(
      themeConfig.input.borderColorLeft
    )}`,
    '&:not(.disabled):focus': {
      borderColor: getCSS(themeConfig.input.active.borderColor)
    },
    '& a': {
      color: getCSS(themeConfig.linkColor)
    }
  })
  return (
    <div className="edit-area">
      <div ref={toolbarRef} className="toolbar">
        <Menus></Menus>
      </div>
      <div ref={textContainerRef} className="text-container">
        <div
          id='text_editor'
          ref={textEditorRef}
          className="text-editor scrollbar-y"
          css={textEditorTheme}
          contentEditable={true}
        ></div>
      </div>
    </div>
  )
}
const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  updateEditor: Actions.updateEditor,
  updateMenuItem: Actions.updateMenuItem,
  updateMenuValue: Actions.updateMenuValue,
}
export default withThemeContext(
  connect(mapStateToProps, mapDispatchToProps)(TextEditor)
)
