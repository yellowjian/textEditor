import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../constants'

function Head(props) {
  const { theme, data } = props
  const initVal = data.get('menuItemVal').toJS()
  const initStatus = data.get('menuItemStatus').toJS()
  const editor = data.get('editor')
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
  const headRef = useRef()
  const customBtn = () => {
    return <i className={`menu-icon-header ` + (initStatus.head ? 'active': '')} css={menuIconTheme}></i>
  }
  const handleChange = (val) => {
    const selectionElem = editor.selection.getSelectionContainerElem()
    // check multi rows selected
    if (selectionElem == editor.textElem) {
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
        value={initVal.headVal}
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
export default withThemeContext(connect(mapStateToProps)(Head))
