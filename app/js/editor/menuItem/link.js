import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'
import Modal from '../../components/modal'
import Input from '../../components/input'

function Link(props) {
  const { data, theme, pureMenu = false } = props
  const themeConfig = theme.config
  const editor = data.get('editor')
  const menuIconTheme = css({
    color: getCSS(themeConfig.button.fontColor),
    '&:hover': {
      color: getCSS(themeConfig.button.active.fontColor)
    }
  })
  const linkRef = useRef()
  const [show, setShow] = useState(false)
  const [linkName, setLinkName] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const linkClick = (e) => {
    setShow(!show)
    let linkelem = void 0

    linkelem = editor.selection.getSelectionContainerElem()
    if(linkelem) {
      return
    }
    // // 当前选区在链接里面
    // editor.selection.createRangeByElem(linkelem)
    // editor.selection.restoreSelection()
    // setLinkName(linkelem.innerText)
    // setLinkUrl(linkelem.getAttribute("href"))
    // // 当前选区不在链接里面
    // if(editor.selection.isSelectionEmpty()) {
    //   setLinkName('')
    // } else {
    //   setLinkName(editor.selection.getSelectionText())
    // }
    // setLinkUrl('')
  }
  const handleOk = () => {
    setShow(!show)
    console.log(linkName, linkUrl)
  }
  const handleCancel = () => {
    setShow(!show)
  }
  return (
    <div className="link" ref={linkRef}>
      <i
        className={`menu-icon-link`}
        css={menuIconTheme}
        onClick={linkClick}
        title='插入链接'
      ></i>
      <Modal
        isShow={show}
        title={'插入链接'}
        width={500}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRoot={linkRef.current? linkRef.current: null}
      >
        <Input placeholder='链接文字' value={linkName} className='link-input'
          onChange={(e) => {setLinkName(e.target.value)}}/>
        <Input placeholder='https://...' value={linkUrl} className='link-input'
          onChange={(e) => {setLinkUrl(e.target.value)}}/>
      </Modal>
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(withThemeContext(Link))
