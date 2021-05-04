'use strict'
import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'
import { SketchPicker } from 'react-color'

function BackColor(props) {
  const { editor, theme } = props
  const themeConfig = theme.config
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const [display, setDisplay] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const handleChange = ({ hex }) => console.log(hex)
  const handleClick = () => {
    setDisplay(!display)
  }
  const handleClose = () => {
    setDisplay(false)
  }
  return (
    <div className="paint-brush">
      <i
        className={`menu-icon-paint-brush`}
        css={menuIconTheme}
        onClick={ handleClick }
      ></i>
      { display ? <div className='popover'>
          <div className='cover' onClick={ handleClose }/>
          <SketchPicker color={ color } onChange={ handleChange } />
        </div> : null }
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    editor: state.editor,
  }
}

export default connect(mapStateToProps)(withThemeContext(BackColor))
