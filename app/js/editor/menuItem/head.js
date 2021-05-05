import React, { useRef } from 'react'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../constants'

function Head(props) {
  const { theme, menusVal, menusStatus, editor } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    'color': getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    },
    '&.active': {
      color: getCSS(themeConfig.button.visible.fontColor)
    }
  })
  const headRef = useRef()
  const customBtn = () => {
    return <i className={`menu-icon-header ` + (menusStatus.head ? 'active' : '')} css={menuIconTheme}></i>
  }
  const handleChange = (val) => {
    const selectionElem = editor.selection.getSelectionContainerElem()
    // check multi rows selected
    if (selectionElem === editor.textElem) {
      return
    }
    editor.cmd.execCmd('formatBlock', val)
  }
  return (
    <div className="head" ref={headRef}>
      <Dropdown
        options={constants.headOptions}
        width={200}
        customBtn={customBtn()}
        value={menusVal.headVal}
        onChange={handleChange}
      ></Dropdown>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    menusVal: state.menusVal,
    menusStatus: state.menusStatus,
    editor: state.editor,
  }
}

export default withThemeContext(connect(mapStateToProps)(Head))
