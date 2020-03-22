import React, { useState, useEffect, useRef, Fragment } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import withThemeContext from '../../hoc/withThemeContext'
import { getCSS } from '../../utils/utils'
import { escapeHtml } from '../util'
import { css } from '@emotion/core'
import constants from '../constants'
import Modal from '../../components/modal'
import TextArea from '../../components/textarea'
import Dropdown from '../../components/dropdown/dropdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'


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
  const areaRef = useRef()
  const codeRef = useRef()
  const languageRef = useRef()
  const [show, setShow] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const codeClick = (e) => {
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
  
  const updateCode = (e) => {
    setCode(e.currentTarget.textContent)
  }
  useEffect(() => {
    let codeArea = areaRef.current && areaRef.current.el
    if(codeArea && !isFirst) {
      setIsFirst(true)
      const events = ['ready', 'load', 'keyup', 'keydown', 'change']
      events.forEach((item) => {
        codeArea.addEventListener(item, function() {
          correctTextareaHight()
          hightlightSyntax()
        })
      })
    }
  }, [show])

  useEffect(() => {
    if (isFirst) {
      hightlightSyntax()
    }
  }, [language])

  HTMLElement.prototype.html = function(str){
    if(typeof str === 'string') {
        this.innerHTML = str;
        return this;
    } else { 
        return this.innerHTML;
    }
  }

  function correctTextareaHight() {
    let codeArea = areaRef.current.el
    let codeShow = codeRef.current
    let outerHeight = codeArea.offsetHeight 
    let innerHeight = codeArea.scrollHeight
    let combinedScrollHeight = innerHeight + 2
    
    if (outerHeight < combinedScrollHeight){
      codeArea.style.height = combinedScrollHeight + 'px'
      codeShow.style.height = combinedScrollHeight + 'px'
    }
  }

  function hightlightSyntax(){
    let content  = areaRef.current.el.value
    let codeHolder = codeRef.current
    var escaped = escapeHtml(content)
    codeHolder.html(escaped)
    hljs.highlightBlock(codeHolder)
  }

  return (
    <div className="code" ref={linkRef}>
      <i
        className={`menu-icon-terminal`}
        css={menuIconTheme}
        onClick={codeClick}
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
        <div className='code-language' ref={languageRef}>
          <Dropdown
            options={constants.languageOptions}
            width={200}
            value="javascript"
            onChange={val => setLanguage(val)}
          ></Dropdown>
        </div>
        <TextArea className='text-area' ref={areaRef} value={code} onChange={(e) => {setCode(e.target.value)}}/>
        <pre><code ref={codeRef} className={`syntax-highight scrollbar-y ${language}`}></code></pre>
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
