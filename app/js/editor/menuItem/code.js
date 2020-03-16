import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { css } from '@emotion/core'
import constants from '../constants'
import Modal from '../../components/modal'
import TextArea from '../../components/textarea'
// import 'highlight.js/styles/github.css'
// hljs.registerLanguage('javascript', javascript);
import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/hopscotch.css'


function Code(props) {
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
  const preRef = useRef()
  const [show, setShow] = useState(false)
  const [code, setCode] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const linkClick = (e) => {
    setShow(!show)
    let linkelem = void 0

    linkelem = editor.selection.getSelectionContainerElem()
    if(linkelem) {
      return
    }
  }
  const handleOk = () => {
    setShow(!show)
  }
  const handleCancel = () => {
    setShow(!show)
  }
  useEffect(() => {
    hightlightSyntax()
  }, [show])
  const updateCode = (e) => {
    setCode(e.currentTarget.textContent)
  }
  const text = <Textarea ref={codeRef} value={code} onChange={(e) => {setCode(e.target.value)}}/>
  return (
    <div className="code" ref={linkRef}>
      <i
        className={`menu-icon-terminal`}
        css={menuIconTheme}
        onClick={linkClick}
        title='插入代码'
      ></i>
      <Modal
        isShow={show}
        title={'插入代码'}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRoot={linkRef.current? linkRef.current: null}
      >
        {text}
        <pre><code class="syntax-highight javascript"></code></pre>
      </Modal> 
    </div>
  ) 
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(withThemeContext(Code))
