import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import cx from 'classnames'
import Dropdown from '../../components/dropdown/dropdown'
import constants from '../constants'

function List(props) {
  const { initVal, theme, data } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const headRef = useRef()
  const customBtn = () => {
    return <i className={`menu-icon-list2`} css={menuIconTheme}></i>
  }
  return (
    <div className="head" ref={headRef}>
      <Dropdown
        options={constants.listOptions}
        width={200}
        customBtn={customBtn()}
        value={initVal.listVal}
        onChange={val => console.log(val)}
      ></Dropdown>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    initVal: state.menuItemVal,
  }
}
export default withThemeContext(connect(mapStateToProps)(List))
